import CartProductModel from "../models/cartproduct.model.js";
import UserModel from "../models/user.model.js";

// Thêm sản phẩm vào giỏ hàng
export const addToCartItemController = async(request,response)=>{
    try {
        const userId = request.userId
        const { productId } = request.body

        if(!productId){
            return response.status(402).json({
                message : "Cung cấp ID sản phẩm",
                error : true,
                success : false
            })
        }

        // Ép kiểu ObjectId khi kiểm tra trùng
        const checkItemCart = await CartProductModel.findOne({
            userId : userId,
            productId : productId
        })

        if(checkItemCart){
            return response.status(400).json({
                message : "Mặt hàng đã có trong giỏ hàng"
            })
        }

        const cartItem = new CartProductModel({
            quantity : 1,
            userId : userId,
            productId : productId
        })

        const save = await cartItem.save()

        const updateCartUser = await UserModel.updateOne({ _id : userId},{
            $push : {
                shopping_cart : productId
            }
        })

            return response.status(200).json({
                data : save,
                message : "Thêm mặt hàng thành công",
                error : false,
                success : true
            })


    } catch (error) {
        return response.status(500).json({
            message : error.message || error,
            error : true,
            success : false
        })
    }
}

// Lấy sản phẩm trong giỏ hàng
export const getCartItemController = async(request,response)=>{
    try {
       
        const userId = request.userId;

        const cartItem = await CartProductModel.find({
            userId : userId
        }).populate('productId')

        return response.json({
            data : cartItem,
            error : false,
            success : true
        })

    } catch (error) {
        return response.status(500).json({
            message : error.message || error,
            error : true,
            success : false
        })
    }
}

// Cập nhật giỏ hàng
export const updateCartItemQtyController = async(request,response)=>{
    try {
            const userId = request.userId
            const { _id,qty } = request.body

            if(!_id || !qty){
                return response.status(400).json({
                    message : "provide _id, qty"
                })
            }

             const updateCartItem = await CartProductModel.updateOne(
                {
                    _id : _id,
                    userId : userId
                },
                {
                    quantity : qty
                }
            )
            return response.json({
                    message : "Cập nhật giỏ hàng thành công",
                    success : true,
                    error : false,
                    data : updateCartItem
            })

        
    } catch (error) {
        return response.status(500).json({
            message : error.message || error,
            error : true,
            success : false
        })
    }
}

// Xóa sản phẩm trong giỏ hàng
export const deleteCartItemQtyController = async(request,response)=>{
    try {
            const userId = request.userId // middleware
            const { _id, productId } = request.body

        if(!_id){
            return response.status(400).json({
                    message : "Provide _id",
                    error : true,
                    success : false
                })
            }
            const deleteCartItem = await CartProductModel.deleteOne({ _id : _id, userId : userId })

            if(!deleteCartItem){
                return response.status(404).json({
                    message:"Không tìm thấy sản phẩm trong giỏ hàng",
                    error:true,
                    success:false
                })
            }

             const user = await UserModel.findOne({
                    _id:userId
                })

                const cartItems = user?.shopping_cart;

                const updatedUserCart = [ ...cartItems.slice(0, cartItems.indexOf(productId)),
                                        ...cartItems.slice(cartItems.indexOf(productId) + 1)];

                user.shopping_cart = updatedUserCart;

                await user.save();

            return response.json({
                    message : "Đã xóa sản phẩm ",
                    error : false,
                    success : true,
                    data : deleteCartItem
            })

        
    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}