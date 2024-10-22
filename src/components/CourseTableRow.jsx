import { useEffect, useState } from "react";
import { RiDeleteBin5Line } from "react-icons/ri";

const CourseTableRow = ({ course, getTotalPrice }) => {
  const [quantity, setQuantity] = useState(course.quantity || 1);
  const [totalPrice, setTotalPrice] = useState(
    course?.discount_price * quantity
  );

  // Recalculate total price when quantity changes
  useEffect(() => {
    const updatedTotalPrice = course?.discount_price * quantity;
    setTotalPrice(updatedTotalPrice);
    getTotalPrice(updatedTotalPrice); // Pass the updated total price
  }, [quantity, course?.discount_price, totalPrice, getTotalPrice]);

  // Increment handler
  const handleIncrement = () => {
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);

    // Update quantity in local storage (since it's a single object)
    const cartItem = JSON.parse(localStorage.getItem("cart"));

    if (cartItem && cartItem.id === course.id) {
      cartItem.quantity = newQuantity;
      localStorage.setItem("cart", JSON.stringify(cartItem));
    }
  };

  // Decrement handler
  const handleDecrement = () => {
    if (quantity > 1) {
      const newQuantity = quantity - 1;
      setQuantity(newQuantity);

      // Update quantity in local storage
      const cartItem = JSON.parse(localStorage.getItem("cart"));

      if (cartItem && cartItem.id === course.id) {
        cartItem.quantity = newQuantity;
        localStorage.setItem("cart", JSON.stringify(cartItem));
      }
    }
  };

  return (
    <tr className="border-b border-gray-300 overflow-x-auto">
      <td>
        <div className="flex items-center justify-center">
          <div className="w-[20%] text-center flex items-center justify-center">
            <RiDeleteBin5Line className="text-xl hover:text-footer_color cursor-pointer" />
          </div>
          <div className="flex flex-col text-center justify-center items-center py-2  w-[80%]">
            <div className="mask">
              <img
                className="h-[40px] w-[70px]"
                src={course?.photo}
                alt="Course"
              />
            </div>
            <p className="text-[14.4px] px-[7px] text-center flex">
              {course?.course_name}
            </p>
          </div>
        </div>
      </td>
      <td>
        <p className="text-[14.4px] font-bold p-[7px] text-black text-center">
          ${course?.discount_price}
        </p>
      </td>
      <td>
        <div className="flex justify-center">
          <div className="border">
            <button
              type="button"
              className="px-4 w-[30px] font-bold font_standard my-1.5"
              onClick={handleDecrement}
            >
              -
            </button>
          </div>

          <div className="border-y flex justify-start items-center p-2">
            <p>{quantity}</p>
          </div>

          <div className="border">
            <button
              type="button"
              className="px-4 w-[30px] font-bold font_standard my-1.5"
              onClick={handleIncrement}
            >
              +
            </button>
          </div>
        </div>
      </td>
      <td>
        <p className="text-[14.4px] font-bold p-[7px] text-black text-center">
          ${totalPrice.toFixed(2)}
        </p>
      </td>
    </tr>
  );
};

export default CourseTableRow;
