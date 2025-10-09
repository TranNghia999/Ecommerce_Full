import React, { useState } from "react";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import { FaRegSquarePlus } from "react-icons/fa6";
import { FaRegSquareMinus } from "react-icons/fa6";

const CategoryCollapse = (props) => {
  const [submenuIndex, setSubmenuIndex] = useState(null);
  const [innerSubmenuIndex, setInnerSubmenuIndex] = useState(null);

  // hàm chuyển đổi trạng thái mở của nút
  const openSubmenu = (index) => {
    if (submenuIndex === index) {
      setSubmenuIndex(null);
    } else {
      setSubmenuIndex(index);
    }
  };

  const openInnerSubmenu = (index) => {
    if (innerSubmenuIndex === index) {
      setInnerSubmenuIndex(null);
    } else {
      setInnerSubmenuIndex(index);
    }
  };

  return (
    <>
      <div className="scroll">
        <ul className="w-full">
          {/* Hiển thị danh mục chính */}
          {props?.data?.length !== 0 &&
            props?.data?.map((cat, index) => {
              return (
                <li
                  className="list-none flex items-center relative flex-col"
                  key={index}
                >
                  <Link to={`/products?catId=${cat?._id}`} 
                        className="w-full">
                    <Button className="w-full !text-left !justify-start !px-3 !text-[rgba(0,0,0,0.8)]">
                      {cat?.name}
                    </Button>
                  </Link>
                  {submenuIndex === index ? (
                    <FaRegSquareMinus
                      className="absolute top-[10px] right-[15px] cursor-pointer"
                      onClick={() => openSubmenu(index)}
                    />
                  ) : (
                    <FaRegSquarePlus
                      className="absolute top-[10px] right-[15px] cursor-pointer"
                      onClick={() => openSubmenu(index)}
                    />
                  )}

                  {submenuIndex === index && (
                    <ul className="submenu  w-full pl-3">
                      {/* Hiển thị danh mục phụ */}
                      {cat?.children?.length !== 0 &&
                        cat?.children?.map((subCat, index_) => {
                          return (
                            <li
                              className="list-none relative mb-1"
                              key={index_}
                            >
                              <Link to={`/products?catId=${subCat?._id}`}
                                    className="w-full">
                                <Button className="w-full !text-left !justify-start !px-3 !text-[rgba(0,0,0,0.8)]">
                                  {subCat?.name}
                                </Button>
                              </Link>
                              {innerSubmenuIndex === index_ ? (
                                <FaRegSquareMinus
                                  className="absolute top-[10px] right-[15px] cursor-pointer"
                                  onClick={() => openInnerSubmenu(index_)}
                                />
                              ) : (
                                <FaRegSquarePlus
                                  className="absolute top-[10px] right-[15px] cursor-pointer"
                                  onClick={() => openInnerSubmenu(index_)}
                                />
                              )}

                              {innerSubmenuIndex === index_ && (
                                <ul className="inner_submenu  w-full pl-3">
                                  {/* Hiển thị danh mục con */}
                                  {subCat?.children?.length !== 0 &&
                                    subCat?.children?.map(
                                      (thirdLavelCat, index__) => {
                                        return (
                                          <li
                                            className="list-none relative mb-1"
                                            key={index__}
                                          >
                                            <Link
                                              to={`/products?catId=${thirdLavelCat?._id}`}
                                              className="link w-full !text-left !justify-start !px-3 transition text-[14px]"
                                            >
                                              {thirdLavelCat?.name}
                                            </Link>
                                          </li>
                                        );
                                      }
                                    )}
                                </ul>
                              )}
                            </li>
                          );
                        })}
                    </ul>
                  )}
                </li>
              );
            })}
        </ul>
      </div>
    </>
  );
};

export default CategoryCollapse;
