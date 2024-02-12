import { Box, Typography } from "@mui/material";
import axios from "axios";
import { CustomButton } from "components";
import { AdminPanelRouteOfEndpoint } from "constant/routesEndPoint";
import "datatables.net";
import { successNotification } from "helper/notification";
import $ from "jquery";
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { capitalizeFirstLetter } from "utils/CapitalizeFirstLetterUtils";
import { getCurrentUser } from "utils/localStorage/getCurrentUser";
import './table.css';

function CourceData({ data, getAllReworkData }) {
  const navigate = useNavigate();
  const dataTableRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const BASE_URL = process.env.REACT_APP_BASE_URL;

  useEffect(() => {
    $(dataTableRef.current).on("click", ".edit-button", function () {
      let row = JSON.parse(decodeURIComponent($(this).data("id")));
      navigate(`${AdminPanelRouteOfEndpoint.COURCE_EDIT_ROUTE}/${row}`);
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const table = $(dataTableRef.current).DataTable({
      pagingType: "numbers",
      responsive: {
        details: false,
      },
      destroy: true,
      info: false,
      columnDefs: [{ targets: [1, 2, 3, 4], orderable: false }],
      responsive: true,
      data: data?.aaData,
      searching: false,
      columns: [
        {
          title: "",
          data: null,
          orderable: false,
          render: function (data, type, row) {
            return `<input className="table_checkbox" style="width: 100%;" type="checkbox" value="${row.course_id}" />`;
          },
        },
        {
          title: 'Image',
          data: 'course_image',
          render: function (data, type) {
            const imageUrl = `${BASE_URL}api/${data}`;
            if (data) {
              return type === 'display' ? `<img src="${imageUrl}" class="source_img" alt="img" />` : data;
            } else {
              return null;
            }
          }
        },
        {
          title: "Product Name",
          data: "course_name",
          render: function (data, type) {
            return capitalizeFirstLetter(data);
          }
        },
        { title: "Price", data: "course_price" },
        {
          title: "Status",
          data: "course_status",
          render: function (data, type, row) {
            console.log(data)
            if (data == "Enable") { return `<div class="enable">Enable</div>` } else { return `<div class="disable">Disable</div>` }
          }
        },
        {
          title: "Action",
          data: "course_id",
          render: function (data) {
            return `<div class="action_cell"><button class="edit-button pointer" data-id="${data}">Edit</button></div>`;
          },
        },
      ],
      initComplete: function () {
        var checkAllCheckbox = $(
          '<input className="table_checkbox" style="width: 100%;" type="checkbox" id="checkAll" />'
        ).appendTo($("#example thead th:first-child"));
        checkAllCheckbox.on("change", function () {
          var checked = $(this).prop("checked");
          $("#example tbody input[type='checkbox']").prop("checked", checked);
        });
      },
    });

    $("#example thead input[type='checkbox']").on("change", function () {
      var checked = $(this).prop("checked");
      $("#example tbody input[type='checkbox']").prop("checked", checked);
    });

    if (loading) {
      $(dataTableRef.current).html('<div class="loading-indicator" style="padding-top: 10vh;">Loading...</div>');
    }

    return () => table.destroy();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const handleGetSelectedIds = async () => {
    const selectedIds = $("#example tbody input[type='checkbox']:checked").map(function () {
      return this.value;
    }).get();
    try {
      setLoading(true);
      const token = getCurrentUser()?.token;
      if (selectedIds !== []) {
        const response = await axios.delete(BASE_URL + 'api/course/multidelete', {
          data: { ids: selectedIds },
          headers: {
            'Content-Type': 'application/json',
            'x-access-token': token
          },
        });
        await getAllReworkData();
        successNotification("Course deleted successfully.");
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("Error:", error);
    }
  };

  return (
    <>
      <Box mt={2}>
        <Typography variant="h5" paddingLeft={2}>Cource</Typography>
      </Box>
      <Box style={{ transform: "translate(0px, 15px)" }} textAlign="end">
        <CustomButton
          variant="contained"
          height="30px"
          width="80px"
          labelFontSize="18px"
          labelFontWeight={400}
          label="Delete"
          border="1px solid var(--black)"
          marginRight="8px"
          onClick={handleGetSelectedIds}
        />
        <CustomButton
          variant="contained"
          height="30px"
          width="80px"
          labelFontSize="18px"
          labelFontWeight={400}
          label="Add"
          border="1px solid var(--black)"
          marginRight="8px"
          onClick={() => navigate(AdminPanelRouteOfEndpoint.COURCE_ADD_ROUTE)}
        />
      </Box>
      <div className="pagination-container">
        <table ref={dataTableRef} className="display_table" id="example" width="100%" />
      </div>
    </>
  )
}
export default CourceData;
