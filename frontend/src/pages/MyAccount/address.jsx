import React, { useEffect } from "react";
import AccountSidebar from "../../components/AccountSidebar";
// Thêm định danh số đt
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
// Icon
import { FaRegTrashCan } from "react-icons/fa6";

//  Các lựa chọn trong mục
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Radio from "@mui/material/Radio";
// Hàm kết nối
import { useContext } from "react";
import { MyContext } from "../../App";
import { useState } from "react";

// Hàm UI hiển thị
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import { deleteData, fetchDataFromApi, postData } from "../../utils/api";

// Nút checkbox
const label = { inputProps: { "aria-label": "Địa chỉ" } };

const Address = () => {
  // code kết nối API với server
  const context = useContext(MyContext);

  // hiển thị Địa chỉ
  const [address, setAddress] = useState([]);
  // Của địa chỉ
  useEffect(() => {
    if (context?.userData?._id !== "" && context?.userData?._id !== undefined) {
      fetchDataFromApi(
        `/api/address/get?userId=${context?.userData?._id}`
      ).then((res) => {
        setAddress(res.address);
      });
    }
  }, [context?.userData]);

  const [isLoading, setIsLoading] = useState(false);
  // code định danh số điện thoại
  const [phone, setPhone] = useState("");
  // code các lựa chọn trong mục đi kèm với Select
  const [status, setStatus] = React.useState(false);

  const [formFields, setFormFields] = useState({
    address_line1: "",
    city: "",
    state: "",
    pincode: "",
    country: "",
    mobile: "",
    status: "",
    userId: "",
    selected: false,
  });

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setFormFields(() => {
      return {
        ...formFields,
        [name]: value,
      };
    });
  };

  useEffect(() => {
    setFormFields((prevState) => ({
      ...prevState,
      userId: context?.userData?._id,
    }));
  }, [context?.userData]);

  // Lấy ID người dùng
  useEffect(() => {
    setFormFields((prevState) => ({
      ...prevState,
      userId: context?.userData?._id,
    }));
  }, [context?.userData]);

  const handleChangeStatus = (event) => {
    setStatus(event.target.value);
    setFormFields((prevState) => ({
      ...prevState,
      status: event.target.value,
    }));
  };

  // Hàm kết nối API data
  const handleSubmit = (e) => {
    e.preventDefault();

    if (formFields.address_line1 === "") {
      context.alertBox("error", "Vui lòng nhập địa chỉ 1 ");
      return false;
    }

    if (formFields.city === "") {
      context.alertBox("error", "Vui lòng nhập tên thành phố ");
      return false;
    }

    if (formFields.state === "") {
      context.alertBox("error", "Vui lòng nhập tiểu bang");
      return false;
    }

    if (formFields.pincode === "") {
      context.alertBox("error", "Vui lòng nhập mã code");
      return false;
    }

    if (formFields.country === "") {
      context.alertBox("error", "Vui lòng nhập quốc gia");
      return false;
    }

    if (formFields.mobile === "") {
      context.alertBox("error", "Vui lòng nhập số điện thoại");
      return false;
    }

    setIsLoading(true);

    // ✅ Làm sạch số điện thoại
    const cleanedPhone = phone
      .replace(/^(\+84|84)0/, "+84") // +840xxxx → +84xxxx
      .replace(/^0/, "+84"); // 0xxxx → +84xxxx

    // ✅ Cập nhật lại vào formFields (không đổi biến gốc)
    formFields.mobile = cleanedPhone;

    postData(`/api/address/add`, formFields, { withCredentials: true }).then(
      (res) => {
        console.log(res);

        if (res?.error !== true) {
          setIsLoading(false);
          context.alertBox("success", res?.message);

          setIsOpenModel(false);
          fetchDataFromApi(
            `/api/address/get?userId=${context?.userData?._id}`).then((res) => {
            setAddress(res.address);
          });
        } else {
          context.alertBox("error", res?.data?.message);
          setIsLoading(false);
        }
      }
    );
  };

  // Đóng mở Address
  const [isOpenModel, setIsOpenModel] = useState(false);

// Xóa địa chỉ
const removeAddress = (id) => {
    deleteData(`/api/address/${id}`).then((res) => {

        // Cập nhật nội dung xóa
         fetchDataFromApi( `/api/address/get?userId=${context?.userData?._id}`).then((res) => {
            setAddress(res.address);
          });
    })
}

  const handleClose = () => {
    setIsOpenModel(false);
  };

  // Nút Radio
  const [selectedValue, setSelectedValue] = useState("");
  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

  return (
    <>
      <section className="py-10 w-full">
        <div className="container flex gap-5">
          <div className="col1 w-[20%]">
            <AccountSidebar />
          </div>

          <div className="col2 w-[50%]">
            <div className="card bg-white p-5 shadow-md rounded-md mb-5">
              <div className="flex items-center pb-3">
                <h2 className="pb-0">Address</h2>
              </div>
              <hr /> <br />
              {/* thêm tại đây */}
              <div
                className="flex items-center justify-center p-5 border rounded-md border-dashed border-[rgba(0,0,0,0.2)] bg-[#f1faff] hover:bg-[#e7f3f9] cursor-pointer"
                onClick={() => setIsOpenModel(true)}
              >
                <span className="text-[14px] font-[500]">Add Address</span>
              </div>

              {/* Thiết lập địa chỉ */}
              <div className="flex gap-2 flex-col mt-4">
                {address?.length > 0 &&
                  address?.map((address, index) => {
                    return (
                    <>
                        <div className=" group relative border border-dashed border-[rgba(0,0,0,0.2)] addressBox bg-[#f1f1f1] p-3 rounded-md !w-full cursor-pointer flex items-center justify-center gap-2">
                          <label  className="mr-auto">
                          <Radio   
                            {...label}
                            name="address"
                            onChange={handleChange}
                            value={address?._id}
                            checked={selectedValue === address?._id}
                          />
                             <span className="text-[12px]">
                            {address?.address_line1 +
                              ", " +
                              address?.city +
                              ", " +
                              address?.country +
                              ", " +
                              address?.state +
                              ", " +
                              address?.pincode}
                          </span>
                          </label>

                         
                                
                          <span className="hidden group-hover:flex items-center justify-center w-[30px] h-[30px] rounded-full bg-gray-500 text-white ml-auto"
                            onClick={() => removeAddress(address?._id)} >
                                <FaRegTrashCan  />
                          </span>
                          
                        </div>
                      </>
                    );
                  })}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Dialog open={isOpenModel}>
        <DialogTitle>Add Delivery Address</DialogTitle>
        <form className="p-8 py-3 pb-8" onSubmit={handleSubmit}>
          {/* dòng 1 */}
          <div className="flex items-center gap-5 pb-5">
            <div className="col w-[100%]">
              <TextField
                size="small"
                label="Address Line 1"
                variant="outlined"
                className="w-full"
                name="address_line1"
                onChange={onChangeInput}
                value={formFields.address_line1}
              />
            </div>
          </div>
          {/* dòng 2 */}

          <div className="flex items-center gap-5 pb-5">
            <div className="col w-[50%]">
              <TextField
                size="small"
                label="City"
                variant="outlined"
                className="w-full"
                name="city"
                onChange={onChangeInput}
                value={formFields.city}
              />
            </div>

            <div className="col w-[50%]">
              <TextField
                size="small"
                label="State"
                variant="outlined"
                className="w-full"
                name="state"
                onChange={onChangeInput}
                value={formFields.state}
              />
            </div>
          </div>

          {/* dòng 3 */}

          <div className="flex items-center gap-5 pb-5">
            <div className="col w-[50%]">
              <TextField
                size="small"
                label="Pincode"
                variant="outlined"
                className="w-full"
                name="pincode"
                onChange={onChangeInput}
                value={formFields.pincode}
              />
            </div>

            <div className="col w-[50%]">
              <TextField
                size="small"
                label="Country"
                variant="outlined"
                className="w-full"
                name="country"
                onChange={onChangeInput}
                value={formFields.country}
              />
            </div>
          </div>

          {/* dòng 4 */}

          <div className="flex items-center gap-5 pb-5">
            <div className="col w-[50%]">
              {/* Sử dụng định danh số điện thoại */}
              <PhoneInput
                defaultCountry="vn"
                value={phone}
                onChange={(phone) => {
                  setPhone(phone);
                  {
                    setFormFields((prevState) => ({
                      ...prevState,
                      mobile: phone,
                    }));
                  }
                }}
                forceDialCode={true}
                disableDialCodePrefill={false}
              />
            </div>

            <div className="col w-[50%]">
              <h3 className="text-[14px] font-[500] mb-1 text-black">Status</h3>
              <Select
                value={status}
                onChange={handleChangeStatus}
                displayEmpty
                inputProps={{ "aria-label": "Without label" }}
                size="small"
                className="w-[100%]"
              >
                <MenuItem value={true}>True</MenuItem>
                <MenuItem value={false}>False</MenuItem>
              </Select>
            </div>
          </div>

          <div className="flex items-center gap-5">
            <Button
              type="submit"
              className="btn-org btn-lg w-full flex gap-2 items-center"
            >
              Save
            </Button>

            <Button
              className="btn-org btn-border btn-lg w-full flex gap-2 items-center"
              onClick={handleClose}
            >
              Canel
            </Button>
          </div>
        </form>
      </Dialog>
    </>
  );
};

export default Address;
