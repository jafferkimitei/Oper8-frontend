const StatCard = ({ title, value }) => {
  return (
    <div className="bg-light-background dark:bg-dark-background shadow-md rounded-lg p-4 m-2 flex flex-col items-center text-center">
      <h2 className="text-lg font-semibold text-light-text dark:text-dark-text">{title}</h2>
      <p className="text-2xl font-bold mt-2 text-blue-600">{value}</p>
    </div>
  );
};

export default StatCard;
