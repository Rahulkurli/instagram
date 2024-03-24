const story = ({ img, username }) => {
  return (
    <div>
      <img
        src={img}
        className="h-14 w-14 p-[1.5px] rounded-full border-2 border-red-500 cursor-pointer object-contain hover:scale-110 transition-all transform duration-150 ease-out"
      />
      <p className="text-xs w-14 truncate text-center">{username}</p>
    </div>
  );
};

export default story;
