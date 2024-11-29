import { useNavigate } from "react-router-dom";

const GetWastePage = () => {
  const navigate = useNavigate();

  return (
    <div className="p-8 flex flex-col items-center gap-8">
      <h1 className="text-3xl font-bold">Guidelines for Biogas Plants to Order Waste</h1>
      <img
        src="./biogas.jpg"
        alt="Biogas Plant Receiving Waste"
        className="w-full h-auto rounded-md"
      />
      <p className="text-lg">
        Biogas plants can order waste from food industries by following these steps:
      </p>
      <ol className="list-decimal text-left pl-8">
        <li>Search for food industries that are offering waste in your area.</li>
        <li>Place an order for the required quantity of waste.</li>
        <li>The estimated time for delivery may vary but will be same for industries and plants in same city.</li>
        <li>Confirm the receipt of waste and process it for biogas production.</li>
      </ol>
      <button
        className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600"
        onClick={() => navigate("/")} // Navigate back to Home
      >
        Back to Home
      </button>
    </div>
  );
};

export default GetWastePage;
