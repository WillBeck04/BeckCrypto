"use client";

import { formatter } from "@/utils/formatter";
import { GlobalData } from "@/utils/getGlobalData";
import { useState } from "react";

export default function TodaInfoMore({
  globalData,
}: {
  globalData: GlobalData;
}) {
  const [readMore, setReadMore] = useState(false);
  return (
    <>
      <button onClick={() => setReadMore(!readMore)}>
        {readMore ? "Read less" : "Read more"}
      </button>

      {readMore ? (
        <p>
          The total crypto market volume is currently{" "}
          <span className="font-semibold">
            {formatter.format(globalData.total_volume.usd)}
          </span>
          $ . Bitcoin’s dominance is currently{" "}
          <span className="font-semibold">
            {globalData.market_cap_percentage.btc.toFixed(2)}%
          </span>
          , on the second place is Ethereum with{" "}
          <span className="font-semibold">
            {globalData.market_cap_percentage.eth.toFixed(2)}%
          </span>
        </p>
      ) : null}
    </>
  );
}
