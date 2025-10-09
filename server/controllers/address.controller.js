import AddressModel from "../models/address.model.js";
import UserModel from "../models/user.model.js";

// Thêm địa chỉ
export const addAddressController = async (request, response) => {
  try {
    const {address_line1, city, state, pincode, country, mobile, status, userId, selected } = request.body;

    
      
    if (!address_line1 || !city || !state || !pincode || !country || !mobile || !userId) {
    return res.status(500).json({
      message: "Vui lòng nhập đầy đủ thông tin",
      error: true,
      success: false
    });
  }

    const address = new AddressModel({
        address_line1, city, state, pincode, country, mobile, status, userId, selected
    })
        const savedAddress = await address.save();

        const updateCartUser = await UserModel.updateOne( { _id: userId }, {
            $push: {
                address_details: savedAddress?._id
            }
        })

        return response.status(200).json({
            data: savedAddress,
            message: "Thêm địa chỉ thành công",
            error: false,
            success: true
        })

  } catch (error) {
    return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
  }
}

// Lấy tất cả địa chỉ
export const getAddressController = async (request, response) => {
  try {
    const address = await AddressModel.find({ userId: request?.query?.userId });

    if (!address || address.length === 0) {
      return response.status(404).json({
        message: "Không tìm thấy địa chỉ",
        error: true,
        success: false
      });
    }

    return response.status(200).json({
      error: false,
      success: true,
      address: address,
      message: "Lấy địa chỉ thành công"
    });

  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false
    });
  }
}

// Xóa địa chỉ
export const deleteAddressController = async(request,response)=>{
    try {
            const userId = request.userId // middleware
            const _id  = request.params.id

        if(!_id){
            return response.status(400).json({
                    message : "Provide _id",
                    error : true,
                    success : false
                })
            }
            const deleteItem = await AddressModel.deleteOne({ _id : _id, userId : userId })

            if(!deleteItem){
                return response.status(404).json({
                    message:"Không tìm thấy địa chỉ",
                    error:true,
                    success:false
                })
            }

            return response.json({
                    message : "Đã xóa địa chỉ",
                    error : false,
                    success : true,
                    data : deleteItem
            })

        
    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}
