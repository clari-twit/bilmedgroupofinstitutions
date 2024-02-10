const tablesToCreate = [
  {
    name: "courses",
    query: `CREATE TABLE courses (
          course_id int(11) NOT NULL,
          course_name varchar(255) NOT NULL,
          course_description text DEFAULT NULL,
          course_expired_days varchar(255) NOT NULL,
          course_image varchar(255) NOT NULL,
          course_length decimal(15,8) DEFAULT 0.00000000,
          course_number_of_videos varchar(255) NOT NULL,
          course_price decimal(15,4) NOT NULL DEFAULT 0.0000,
          course_status bigint(20) NOT NULL,
          create_at datetime NOT NULL,
          update_at datetime DEFAULT NULL
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;`,
  },
  {
    name: "course_data",
    query: `CREATE TABLE course_data (
          course_data_id int(11) NOT NULL,
          course_id int(11) NOT NULL,
          course_data_type varchar(15) NOT NULL COMMENT 'mp4=1,pdf=2',
          course_data_title text NOT NULL,
          course_data_url text NOT NULL,
          course_data_length varchar(90) NOT NULL,
          course_data_count_of_view bigint(20) NOT NULL DEFAULT 0,
          course_data_sort_order int(3) NOT NULL,
          create_at datetime NOT NULL,
          update_at datetime DEFAULT NULL
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci`,
  },
  {
    name: "customer",
    query: `CREATE TABLE customer (
        customer_id int(11) NOT NULL,
        name varchar(255) NOT NULL,
        email varchar(96) NOT NULL,
        telephone varchar(32) NOT NULL,
        password varchar(255) NOT NULL,
        ip varchar(40) NOT NULL DEFAULT '0',
        status tinyint(1) NOT NULL,
        token varchar(255) DEFAULT NULL,
        create_at datetime NOT NULL,
        update_at datetime DEFAULT NULL,
        device_info varchar(255) DEFAULT NULL,
        payment_method varchar(60) DEFAULT NULL,
        payment_transaction_id varchar(255) DEFAULT NULL
      ) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci`,
  },
  {
    name: "customer_address",
    query: `CREATE TABLE customer_address (
        customer_address_id int(11) NOT NULL,
        customer_id int(11) NOT NULL,
        first_name varchar(100) NOT NULL,
        last_name varchar(100) NOT NULL,
        company varchar(255) DEFAULT NULL,
        company_id varchar(100) DEFAULT NULL,
        tax_id varchar(100) DEFAULT NULL,
        address_1 varchar(255) DEFAULT NULL,
        address_2 varchar(255) DEFAULT NULL,
        city varchar(50) DEFAULT NULL,
        postcode varchar(20) DEFAULT NULL,
        country varchar(50) DEFAULT NULL,
        state varchar(50) DEFAULT NULL,
        create_at datetime NOT NULL,
        update_at datetime DEFAULT NULL
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci`,
  },
  {
    name: "customer_order_courses",
    query: `CREATE TABLE customer_order_courses (
        customer_order_courses_id int(11) NOT NULL,
        customer_id bigint(11) NOT NULL,
        course_id bigint(11) NOT NULL,
        customer_order_courses_status int(11) NOT NULL COMMENT 'expired=2,running=1',
        customer_order_courses_expired_date datetime NOT NULL,
        create_at datetime NOT NULL,
        update_at datetime NOT NULL
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;`,
  },
  // Add more tables as needed
];

export default tablesToCreate;
