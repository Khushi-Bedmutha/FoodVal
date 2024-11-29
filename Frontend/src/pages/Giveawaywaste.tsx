import { useNavigate } from "react-router-dom";

const GiveawayWastePage = () => {
  const navigate = useNavigate();

  return (
    <div className="p-8 flex flex-col items-center gap-8">
      <h1 className="text-3xl font-bold">Guidelines for Giving Away Waste</h1>
      <img
        src="./industry.jpg"
        className="w-full h-auto rounded-md"
      />
      <p className="text-lg">
        Industries can giveaway their waste to biogas plants by following these steps:
      </p>
      <ol className="list-decimal text-left pl-8">
        <li>Identify the biogas plants that are registered on our platform.</li>
        <li>Ensure that the waste is properly segregated before delivery.</li>
        <li>Schedule a pickup or arrange for delivery through the platform.</li>
        <li>Track the delivery status through your dashboard.</li>
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

export default GiveawayWastePage;
