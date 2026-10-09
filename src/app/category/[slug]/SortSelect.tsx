"use client";

import { useRouter, useSearchParams } from "next/navigation";

interface SortSelectProps {
slug: string;
sort: string;
}

export default function SortSelect({
slug,
sort,
}: SortSelectProps) {
const router = useRouter();
const searchParams = useSearchParams();

function handleSortChange(value: string) {
const params = new URLSearchParams(searchParams.toString());


if (value === "default") {
  params.delete("sort");
} else {
  params.set("sort", value);
}

const query = params.toString();
const url = `/category/${slug}${query ? `?${query}` : ""}`;

router.push(url, { scroll: false });


}

return ( <div> <label htmlFor="sort" className="sr-only">
পণ্যের দাম অনুযায়ী সাজান </label>

```
  <select
    id="sort"
    value={sort}
    onChange={(event) => handleSortChange(event.target.value)}
    className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 outline-none focus:border-green-600"
  >
    <option value="default">ডিফল্ট</option>
    <option value="asc">দাম: কম থেকে বেশি</option>
    <option value="desc">দাম: বেশি থেকে কম</option>
  </select>
</div>


);
}
