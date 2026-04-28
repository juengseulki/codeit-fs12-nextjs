async function getBreeds() {
  const res = await fetch(
    `https://api.thecatapi.com/v1/images/search?api_key=${process.env.CAT_API_KEY}&limit=8&has_breeds=1`,
  );

  if (!res.ok) {
    throw new Error("고양이 데이터를 가져오는데 실패했습니다");
  }

  return res.json();
}

export default async function CatBreeds() {
  const cats = await getBreeds();

  return (
    <main className="flex flex-col items-center px-4 py-10">
      <h1 className="mb-8 text-center text-3xl font-bold text-secondary">
        The Cat API
      </h1>

      <div className="grid grid-cols-4 gap-4">
        {cats.map((cat) => {
          const breed = cat.breeds?.[0];

          return (
            <div key={cat.id} className="overflow-hidden rounded-[10px]">
              <img
                src={cat.url}
                alt={breed?.name || "cat"}
                className="h-[200px] w-full object-cover"
              />

              <div className="p-2">
                <p className="text-center font-bold text-secondary">
                  {breed?.name}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </main>
  );
}
