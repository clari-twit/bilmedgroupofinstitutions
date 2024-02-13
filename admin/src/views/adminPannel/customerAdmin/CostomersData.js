import { Box, Typography } from '@mui/material';
import axios from 'axios';
import { CustomButton } from 'components';
import { AdminPanelRouteOfEndpoint } from 'constant/routesEndPoint';
import "datatables.net";
import { successNotification } from "helper/notification";
import $ from "jquery";
import { useEffect, useRef } from 'react';
import { useNavigate } from "react-router-dom";
import { capitalizeFirstLetter } from 'utils/CapitalizeFirstLetterUtils';
import { getCurrentUser } from 'utils/localStorage/getCurrentUser';

function CostomersData({ data, getAllReworkData }) {
  const navigate = useNavigate();
  const dataTableRef = useRef(null);
  const BASE_URL = process.env.REACT_APP_BASE_URL;

  useEffect(() => {
    $(dataTableRef.current).on("click", ".edit-button", function () {
      let row = JSON.parse(decodeURIComponent($(this).data("id")));
      navigate(`${AdminPanelRouteOfEndpoint.CUSTOMER_ADMIN_EDIT_ROUTE}/${row}`);
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const table = $(dataTableRef.current).DataTable({
      pagingType: "numbers",
      destroy: true,
      info: false,
      searching: false,
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
        {
          title: "Customer Name",
          data: "name",
          render: function (data, type) {
            return capitalizeFirstLetter(data);
          }
        },
        { title: "E-mail", data: "email" },
        { title: "IP Address", data: "ip" },
        {
          title: "Status", data: "status",
          render: function (data) {
            if (data === 1) { return `<div class="enable">Enable</div>` } else { return `<div class="disable">Disable</div>` }
          }
        },
        {
          title: "Login Device",
          data: "device_info",
        },
        {
          title: "Action",
          data: "customer_id",
          render: function (data) {
            return `<div class="action_cell"><button class="edit-button pointer" data-id="${data}">Edit</button></div>`;
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
      // eslint-disable-next-line
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
    <>
      <Box mt={2}>
        <Typography variant="h5" paddingLeft={2}>Customer</Typography>
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
          onClick={() => navigate(AdminPanelRouteOfEndpoint.CUSTOMER_ADMIN_ADD_ROUTE)}
        />
      </Box>
      {/* <button className="btn m-0" type="button" onClick={(handleRefreshClick) => handleGetSelectedIds(handleRefreshClick)}>delete</button> */}
      <table ref={dataTableRef} className="display_table" id="example" width="100%"></table>
    </>
  )
}

export default CostomersData;
