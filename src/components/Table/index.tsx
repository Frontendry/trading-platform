// Components
import TableHead from "../TableHead";
import TableBody from "../TableBody";

const Table = () => {
  return (
    <div className="container">
      <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-4 inline-block w-full sm:px-6 lg:px-8">
          <div className="overflow-hidden">
            <div className="w-full text-center">
              <TableHead />
              <TableBody />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Table;
