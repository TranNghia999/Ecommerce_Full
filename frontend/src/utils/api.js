import axios from "axios";
// Kết nối API server cổng 8000
const apiUrl = import.meta.env.VITE_API_URL;

// API dữ liệu Đăng ký / Đăng nhập / xác minh email - email khi quên mật khẩu   / Quên mật khẩu
export const postData = async (url, formData) => {
      try {

        const response = await fetch(apiUrl + url, {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('accessToken')}`, // Include
              'Content-Type': 'application/json', // Adjust the content type as needed
            },
            body: JSON.stringify(formData)
        });

        if (response.ok) {
              const data = await response.json();
              //console.log(data)
              return data;
        } else {
              const errorData = await response.json();
              return errorData;
        }
          } catch (error) {
              console.error('Error:', error);
      }
  }
// API lấy thông tin người dùng
export const fetchDataFromApi = async (url) => {
  try {
    const params={
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`, // Include
          'Content-Type': 'application/json', // Adjust the content type as needed
        },
      }

    const { data } = await axios.get(apiUrl + url, params)
    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
}
// Đăng ảnh đại diện lên
export const uploadImage = async (url, updatedData) => {
  const params = {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('accessToken')}`, // Include your API key in the Authorization header
      'Content-Type': 'multipart/form-data', // Adjust the content type as needed
    },
  };

  
  var response;
  await axios.put(apiUrl + url, updatedData, params).then((res)=>{
       console.log(res)
        response = res
  })
   return response;
   
  
};
// cập nhật thông tin người dùng trong profile
export const editData = async (url, updatedData) => {
  const params = {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('accessToken')}`, // Include your API key in the Authorization header
      'Content-Type': 'application/json', // Adjust the content type as needed
    },
  };

  
  var response;
  await axios.put(apiUrl + url, updatedData, params).then((res)=>{
       console.log(res)
        response = res
  })
   return response;
   
  
};

// Xóa Dữ Liệu
export const deleteData = async (url) => {
    const params={
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`, // Include your API key in the Authorization header
            'Content-Type': 'application/json', // Adjust the content type as needed
        },
    }

    const { res } = await axios.delete(apiUrl + url, params)
    return res;
}

// Format Giá Tiền
export const formatCurrency = (value) => {
  if (!value) return "0đ"; 

  // Ép về number (phòng trường hợp value là string như "1279000")
  const number = Number(value);

  if (isNaN(number)) return value; // nếu không phải số thì trả về nguyên gốc

  return number.toLocaleString("vi-VN") + "đ";
};