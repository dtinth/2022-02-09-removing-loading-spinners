import { Suspense } from "react";
import { useRouter } from "next/router";
import useSWR from "swr";
import Spinner from "../../components/spinner";

export default function Message() {
  let router = useRouter();
  return (
    <div className="w-full p-8 overflow-y-scroll">
      <Suspense fallback={<Spinner />}>
        <MessageView mid={router.query.mid} />
      </Suspense>
    </div>
  );
}

function MessageView({ mid }) {
  let { data } = useSWR(`/api/messages/${mid}`, { suspense: true });

  return (
    <>
      <h1 className="text-2xl font-bold">{data.message.title}</h1>

      <div className="mt-6 space-y-2 text-zinc-400">
        {data.message.body.split("\n").map((paragraph, i) => (
          <p key={i}>{paragraph}</p>
        ))}
      </div>
    </>
  );
}
