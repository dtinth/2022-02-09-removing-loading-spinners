import { Suspense, useDeferredValue } from "react";
import { useRouter } from "next/router";
import useSWR from "swr";
import Spinner from "../../components/spinner";

export default function Message() {
  let router = useRouter();
  let targetMid = router.query.mid;
  let displayedMid = useDeferredValue(targetMid);
  let loading = targetMid !== displayedMid;
  return (
    <div className="w-full p-8 overflow-y-scroll">
      <Suspense fallback={<Spinner />}>
        <MessageView mid={displayedMid} loading={loading} />
      </Suspense>
    </div>
  );
}

function MessageView({ mid, loading }) {
  let { data } = useSWR(`/api/messages/${mid}`, { suspense: true });

  return (
    <div
      style={{
        opacity: loading ? 0.5 : 1,
        transition: loading ? "opacity 0.1s 0.3s" : "none",
      }}
    >
      <h1 className="text-2xl font-bold">{data.message.title}</h1>

      <div className="mt-6 space-y-2 text-zinc-400">
        {data.message.body.split("\n").map((paragraph, i) => (
          <p key={i}>{paragraph}</p>
        ))}
      </div>
    </div>
  );
}
