import axios from 'axios';
import "datatables.net";
import { successNotification } from "helper/notification";
import $ from "jquery";
import { useEffect, useRef } from 'react';
import { getCurrentUser } from 'utils/localStorage/getCurrentUser';

function CostomersData({ data, getAllReworkData }) {
  const dataTableRef = useRef(null);
  const BASE_URL = process.env.REACT_APP_BASE_URL;

  // useEffect(() => {
  //   $(dataTableRef.current).on("click", ".edit-button", function () {
  //     let row = JSON.parse(decodeURIComponent($(this).data("id")));
  //     router.replace(`/costumers/edit/${row}`);
  //   })
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  useEffect(() => {
    const table = $(dataTableRef.current).DataTable({
      pagingType: "numbers",
      destroy: true,
      info: false,
      columnDefs: [{ targets: [1, 2, 3, 4, 5, 6] }],
      responsive: true,
      data: data?.aaData,
      columns: [
        {
          title: "",
          data: null,
          render: function (row) {
            return `<input className="table_checkbox" style="width: 50px;" type="checkbox" value="${row.customer_id}" />`;
          },
        },
        { title: "Customer Name", data: "name" },
        { title: "E-mail", data: "email" },
        { title: "IP", data: "ip" },
        {
          title: "Status", data: "status",
          render: function (data) {
            if (data == 1) { return "enable" } else { return "disable" }
          }
        },
        {
          title: "Login into Store",
          data: "device_info",
        },
        {
          title: "Action",
          data: "customer_id",
          render: function (data) {
            return `
              <div class="action_cell"><button  class="edit-button pointer" data-id="${data}" >edit</button></div>`
          },
        },
      ],
      initComplete: function () {
        var checkAllCheckbox = $(
          '<input  className="table_checkbox" style="width: 50px;" type="checkbox" id="checkAll" />'
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
    return () => table.destroy();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const handleGetSelectedIds = async () => {
    const selectedIds = $("#example tbody input[type='checkbox']:checked").map(function () {
      return this.value;
    }).get();
    try {
      const token = getCurrentUser()?.token;
      const response = await axios.delete(BASE_URL + '/api/customer/mlpdelete', {
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': token
        },
        data: JSON.stringify({ ids: selectedIds })
      });
      await getAllReworkData()
      successNotification("Customer Delete successfully.");
    } catch (error) {
      console.error('Error:', error);
    }
  }

  return (
    <div>
      {/* <button className="btn m-0" type="button" onClick={(handleRefreshClick) => handleGetSelectedIds(handleRefreshClick)}>delete</button> */}
      <table ref={dataTableRef} className="display_table" id="example" width="100%"></table>
    </div>
  )
}

export default CostomersData;
