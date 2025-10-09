import Button from "@mui/material/Button";
import React, { useState } from "react";
import { RiMenu2Fill } from "react-icons/ri";
import { LiaAngleDownSolid } from "react-icons/lia";
import { Link } from "react-router-dom";
import { GoRocket } from "react-icons/go";
import CategoryPanel from "./CategoryPanel";
import "./style.css";
import { useEffect } from "react";
import { MyContext } from "../../../App";
import { useContext } from "react";

const Navigation = () => {
  // code nút  Shop By Categories
  const [isOpenCatPanel, setIsOpenCatPanel] = useState(false);

  const openCategoryPanel = () => {
    setIsOpenCatPanel(true);
  };

  // Của  Server để hiển thị
  const context = useContext(MyContext);

  const [catData, setCatData] = useState([]);

  useEffect(() => {
      setCatData(context?.catData);
  }, [context?.catData]);

  return (
    <>
      <nav>
        <div className="container flex items-center justify-end gap-5">
          <div className="col_1 w-[18%]">
            <Button
              className="!text-black gap-2 w-full"
              onClick={openCategoryPanel}
            >
              <RiMenu2Fill className="text-[18px]" />
              Danh mục sản phẩm
              <LiaAngleDownSolid className="text-[13px] ml-auto font-bold " />
            </Button>
          </div>
          <div className="col_2 w-[67%]">
            <ul className="flex items-center gap-2 nav">
              <li className="list-none">
                <Link to="/" className="link transition text-[14px] font-[500]">
                  <Button className="!link transition !font-[500] !text-[rgba(0,0,0,0.8)] hover:!text-[#ff5252] !py-4">
                    TRANG CHỦ
                  </Button>
                </Link>
              </li>
              {catData?.length !== 0 &&
                catData?.map((cat, index) => {
                  return (
                    <li className="list-none relative" key={index}>

                      <Link  to={`/products?catId=${cat?._id}`}
                        className="link transition text-[14px] font-[500]"
                      >
                        <Button className="!link transition !font-[500] !text-[rgba(0,0,0,0.8)] hover:!text-[#ff5252] !py-4">
                          {cat?.name}
                        </Button>
                      </Link>

                      {cat?.children?.length !== 0 && (
                        <div className="submenu absolute top-[120%] left-[0%] min-w-[200px] bg-white shadow-md opacity-0 transition-all">
                          <ul>
                            {cat?.children?.map((subCat, index_) => {
                              return (
                                <li
                                  className="list-none w-full relative custom-button"
                                  key={index_}
                                >
                                  <Link to={`/products?catId=${subCat?._id}`}
                                        className="w-full">
                                    <Button className="custom-button !text-[rgba(0,0,0,0.8)] w-full !text-left !justify-start !rounded-none hover:!text-[#ff5252]">
                                      {subCat?.name}
                                    </Button>
                                    {/* link menu nhỏ của Men */}

                                    {subCat?.children?.length !== 0 && (
                                      <div className="submenu absolute top-[0%] left-[100%] min-w-[250px] bg-white shadow-md opacity-0 transition-all">
                                        <ul>
                                          {subCat?.children?.map(
                                            (thirdLavelCat, index__) => {
                                              return (
                                                <li className="list-none w-full" key={index__}>
                                                  
                                                  <Link
                                                    to={`/products?catId=${thirdLavelCat?._id}`}
                                                    className="w-full"
                                                  >
                                                    <Button className="!text-[rgba(0,0,0,0.8)] w-full !text-left !justify-start !rounded-none hover:!text-[#ff5252]">
                                                      {thirdLavelCat?.name}
                                                    </Button>
                                                  </Link>
                                                </li>
                                              );
                                            }
                                          )}
                                        </ul>
                                      </div>
                                    )}
                                  </Link>
                                </li>
                              );
                            })}
                          </ul>
                        </div>
                      )}
                    </li>
                  );
                })}
            </ul>
          </div>
          <div className="col_3 w-[15%]">
            <p className="text-[14px] font-[500] flex items-center gap-3 mb-0 mt-0">
              <GoRocket className="text-[18px]" />
              Freeship toàn quốc
            </p>
          </div>
        </div>
      </nav>
      {/* Thành phần bản danh mục */}
      {
          catData?.length !== 0 &&
           <CategoryPanel
        isOpenCatPanel={isOpenCatPanel}
        setIsOpenCatPanel={setIsOpenCatPanel}
        data={catData}
      />
      }
     
    </>
  );
};

export default Navigation;
