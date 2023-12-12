const ModelDialoge = ({ closeModel }) => {
  return (
    <>
      <div
        className="fixed left-0 right-0 top-0 bottom-0 max-w-[100rem]  bg-slate-400 bg-opacity-90 "
        onClick={closeModel}
      ></div>
      <div className="fixed  flex flex-col px-8 py-8 rounded-lg   bg-white">
        <h2>stay tuned</h2>
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Et officiis
          libero reprehenderit, accusamus expedita sit a sunt sed fugit eaque ab
          debitis ullam similique temporibus exercitationem, fuga quasi. Quidem,
          aspernatur?
        </p>
        <button onClick={closeModel}>Close</button>
      </div>
    </>
  );
};
export default ModelDialoge;
