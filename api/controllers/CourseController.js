import "dotenv/config";
import lodash from "lodash";

import courseModel from "../models/course.model.js";
import courseDataModel from "../models/courseData.model.js";
import fs from "fs";

const { _ } = lodash;
export default class CourseController {
  static async insertCourse(req, res) {
    try {
      const {
        course_name,
        course_description,
        course_exp_days,
        course_length,
        course_total_video,
        course_price,
        course_doller_price,
        course_head_option,
        course_status,
        course_data,
      } = req.body;
      const fetchData = JSON.parse(course_data);
      const course_source = fetchData.course_source;
      var image_path = "";
      if (req.files && Object.keys(req.files).length > 0) {
        const image = _.first(req.files.course_file);
        image_path = `${image.destination}/${image.filename}`;
      }

      const formattedDate = new Date().toISOString().slice(0, 19).replace("T", " ");

      const headOptionString = JSON.stringify(course_head_option);

      const courseId = await courseModel.create({
        course_name,
        course_description,
        course_expired_days: course_exp_days,
        course_image: image_path,
        course_length,
        course_total_video,
        course_price,
        course_doller_price,
        course_head_option: headOptionString,
        course_status,
        create_at: formattedDate,
      });

      if (course_source && course_source.length > 0) {
        for (const [index, source] of course_source.entries()) {
          await courseDataModel.create({
            course_id: courseId,
            course_data_type: source.source_data_type,
            course_data_title: source.source_type_title,
            course_data_url: source.source_URL,
            course_data_length: source.source_length,
            course_data_category: source.source_category,
            course_data_heading: source.source_heading,
            course_data_sort_order: index + 1,
            create_at: formattedDate,
          });
        }
      }

      res.json({
        status: true,
        message: "Course Created Successfully....",
      });
    } catch (error) {
      console.log(error, "error");
      res.json({
        status: false,
        message: error.message,
      });
    }
  }

  static async getcourse(req, res) {
    try {
      const { draw, start, length, order, search, columns } = req.query;
      let column;
      let column_sort_order;
      let search_value = "";

      if (typeof order === "undefined") {
        column = "course_id";
        column_sort_order = "DESC";
      } else {
        search_value = search["value"] || "";
        const column_index = order[0]["column"];
        column = columns[column_index]["data"];
        column_sort_order = order[0]["dir"];
      }

      const search_query = search_value
        ? `AND (course_name LIKE '%${search_value}%'
              OR course_description LIKE '%${search_value}%'
                OR cd.course_data_type LIKE '%${search_value}%'
            OR cd.course_data_title LIKE '%${search_value}%'
            OR cd.course_data_url LIKE '%${search_value}%'
            OR cd.course_data_length LIKE '%${search_value}%'
            OR cd.course_data_category LIKE '%${search_value}%'
            OR cd.course_data_heading LIKE '%${search_value}%'
            ) `
        : "";

      // const offset = start || 0;
      // const page = Math.floor(start / length);
      // const pageSize = length || 10;
      const page = isNaN(start) ? 0 : Math.floor(Number(start) / (length || 10));
      const pageSize = isNaN(length) ? 10 : Number(length);

      const offset = page * pageSize;
      const conditions = `1 ${search_query}`;

      const coursesWithCourseData = await courseModel.findAllWithCourseData(conditions, `${column} ${column_sort_order}`, pageSize, offset);
      const total_courses = await courseModel.count(conditions);

      const total_filter_request = total_courses;

      if (coursesWithCourseData.length <= 0) {
        return res.json({
          status: false,
          message: "No data found",
        });
      }

      res.json({
        draw: draw,
        iTotalRecords: total_courses,
        iTotalDisplayRecords: total_filter_request,
        aaData: coursesWithCourseData,
      });
    } catch (error) {
      res.json({
        status: false,
        message: error.message,
      });
    }
  }

  static async editCourse(req, res) {
    try {
      var course_id = req.query.course_id;
      const course = await courseModel.findById(course_id);
      const courseData = await courseDataModel.findById(course_id);
      res.json({
        status: true,
        course: {
          course,
          courseData,
        },
      });
    } catch (error) {
      console.log(error, "error");
      res.json({
        status: false,
        message: "Somthing Wrong !!" || error.message,
      });
    }
  }

  static async updateCourse(req, res) {
    try {
      // const { course, course_data } = JSON.parse(req.body.course_data);

      const {
        course_id,
        course_name,
        course_description,
        course_exp_days,
        course_length,
        course_total_video,
        course_price,
        course_doller_price,
        course_head_option,
        course_status,
        course_data,
      } = req.body;
      const fetchData = JSON.parse(course_data);
      const course_source = fetchData.course_source;
      const courses = await courseModel.findById(course_id);
      const headOptionString = JSON.stringify(course_head_option);
      var image = "";
      if (req.files && Object.keys(req.files).length > 0) {
        image = _.first(req.files.course_file);
      }
      var new_image = "";
      if (image !== undefined && image !== "") {
        new_image = `${image.destination}/${image.filename}`;
        try {
          fs.unlinkSync(`../server/${courses.course_image}`, (err) => {
            if (err) throw err;
          });
        } catch (err) {
          console.log(err);
        }
      } else {
        new_image = courses.course_image;
      }

      const formattedDate = new Date().toISOString().slice(0, 19).replace("T", " ");

      await courseModel.update({
        course_id,
        course_name,
        course_description,
        course_expired_days: course_exp_days,
        course_image: new_image,
        course_length,
        course_total_video,
        course_price,
        course_doller_price,
        course_head_option: headOptionString,
        course_status,
        update_at: formattedDate,
      });


      for (const [index, source] of course_source.entries()) {
        const maxSortOrder = await courseDataModel.getMaxSortOrder(course_id);
        if (source.course_data_id) {
          // If course_data_id exists, update the existing entry
          await courseDataModel.update({
            course_data_type: source.source_data_type,
            course_data_title: source.source_type_title,
            course_data_url: source.source_URL,
            course_data_length: source.source_length,
            course_data_category: source.source_category,
            course_data_heading: source.source_heading,
            course_data_sort_order: index + 1,
            update_at: formattedDate,
            course_data_id: source.course_data_id,
          });
        } else {
          const newSortOrder = maxSortOrder + 1;
          // If course_data_id doesn't exist, insert a new entry
          await courseDataModel.create({
            course_id: course_id,
            course_data_type: source.source_data_type,
            course_data_title: source.source_type_title,
            course_data_url: source.source_URL,
            course_data_length: source.source_length,
            course_data_category: source.source_category,
            course_data_heading: source.source_heading,
            course_data_sort_order: newSortOrder,
            create_at: formattedDate,
          });
        }
      }

      res.json({
        status: true,
        message: "course Updated Successfully....",
      });
    } catch (error) {
      console.log(error);
      res.json({
        status: false,
        message: error.message,
      });
    }
  }

  static async deleteMultipleCourse(req, res) {
    try {
      const { ids } = req.body;
      const course_ids  = ids.map(id => parseInt(id))
      // console.log(course_ids ,"fghh");

      const courses = await courseModel.findByMultipleIds(course_ids);
      // console.log(courses,"courses"); 
      // if (courses) {
      //   courses.forEach((course) => {
      //     console.log(course ,"course");
      //     var Images = course.course_image;
      //     if (Images !== "") {
      //       fs.unlinkSync(`../server/${Images}`, (err) => {
      //         if (err) throw err;
      //       });
      //     }
      //   });
      // }
      const deletedCourseIds = await courseModel.deleteMultiple(course_ids);
      await courseDataModel.deleteMultipleByCourseIds(deletedCourseIds);

      res.json({
        status: true,
        message: "course and their course data deleted successfully.",
      });
    } catch (error) {
      console.log(error, "error");
      res.json({
        status: false,
        message: error.message || "An error occurred while deleting users.",
      });
    }
  }

  static async getCourseByCustomer(req, res) {
    try {
      const customer_id = req.query.customer_id;

      const courses = await courseModel.findByCustomerId(customer_id);

      if (!courses || courses.length === 0) {
        return res.json({
          status: true,
          courseData: [],
          message: "No courses found for the given customer ID.",
        });
      }

      const course_ids = courses.map((course) => course.course_id);
      const courses_data = await courseModel.findByCourseIds(course_ids);

      const combinedArray = courses.map((course) => {
        const matchingCourseData = courses_data.find((data) => data.course_id === course.course_id);

        return {
          ...course,
          ...matchingCourseData,
        };
      });

      if (combinedArray.length > 0) {
        const dataArray = combinedArray.map((course) => {
          if (course.course_data !== null && typeof course.course_data === "string") {
            course.course_data = JSON.parse(course.course_data);
          }
          return course;
        });

        res.json({
          status: true,
          courseData: dataArray,
          message: "Customer Course Data Get Successfully!!",
        });
      } else {
        res.json({
          status: true,
          courseData: [],
          message: "No course data found for the given customer ID.",
        });
      }
    } catch (error) {
      console.log(error, "error");
      res.json({
        status: false,
        message: error.message || "An error occurred while fetching customer courses.",
      });
    }
  }

  static async courseVideoCount(req, res) {
    try {
      const course_data_id = req.query.course_data_id;

      const courseData = await courseDataModel.getCourseDataById(course_data_id);

      const course_data_count_of_view = courseData.course_data_count_of_view + 1;

      const data = await courseDataModel.updateCourseVideoCount({
        course_data_count_of_view,
        course_data_id,
      });

      res.json({
        status: true,
        message: "Course Count Plus Successfully!!",
      });
    } catch (error) {
      res.json({
        status: false,
        message: error.message || "An error occurred while fetching customer courses.",
      });
    }
  }
}
