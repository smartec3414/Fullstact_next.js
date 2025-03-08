const page = async ({
  searchParams,
}: {
  searchParams: Promise<{ searchText: string }>;
}) => {
  let { searchText } = await searchParams;

  return (
    <div
      className="mt-20 container"
      style={{ minHeight: "calc(100vh - 100px)" }}>
      page is : {searchText}
    </div>
  );
};

export default page;
