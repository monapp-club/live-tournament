interface PoolHeaderProps {
  children: string;
}

const PoolHeader = ({ children = "" }: PoolHeaderProps) => {
  return (
    <div className="sm:flex sm:items-center pb-2">
      <div className="sm:flex-auto">
        <h1 className="text-xl font-semibold text-gray-900">{children}</h1>
      </div>
    </div>
  );
};

export default PoolHeader;
