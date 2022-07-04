import MoodCard from "../components/Layout/MoodCard";

const DUMMY_MOODS = [
  {
    key: "2022-07-04",
    alcoholConsumption: true,
    anxiety: "None",
    date: "2022-07-04",
    depression: "None",
    enthusiasm: "None",
    irritability: "None",
    notes: "Test",
    physicalActivity: true,
    createdAt: "2000/10/01",
  },
  {
    key: "2022-07-03",
    alcoholConsumption: false,
    anxiety: "Medium",
    date: "2022-07-03",
    depression: "Medium",
    enthusiasm: "Medium",
    irritability: "Medium",
    notes: "Test2",
    physicalActivity: true,
    createdAt: "2022/06/01",
  },
];

const MoodsPage = () => {
  return (
    <div className="container">
      {DUMMY_MOODS.map((mood) => {
        return <MoodCard key={mood.key} data={mood} />;
      })}
    </div>
  );
};

export default MoodsPage;
