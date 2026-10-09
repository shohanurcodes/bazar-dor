"use client";

interface SortSelectProps {
slug: string;
sort: string;
}

export default function SortSelect({
slug,
sort,
}: SortSelectProps) {
return (
<form action={`/category/${slug}`} method="GET"> <label htmlFor="sort" className="sr-only">
পণ্যের দাম অনুযায়ী সাজান </label>


  <select
    id="sort"
    name="sort"
    defaultValue={sort}
    onChange={(event) => {
        event.preventDefault()
      event.currentTarget.form?.requestSubmit();
    }}
    className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 outline-none focus:border-green-600"
  >
    <option value="default">ডিফল্ট</option>
    <option value="asc">দাম: কম থেকে বেশি</option>
    <option value="desc">দাম: বেশি থেকে কম</option>
  </select>
</form>


);
}
