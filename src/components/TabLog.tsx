import LogCard from "./LogCard";
import { Button } from "./ui/button";

export default function TabLog({ totalLog }: { totalLog: number; }) {
  return (
    <div className="bg-neutral-700 rounded-3xl p-5 space-y-5">
      <div className="tracking-wider flex items-center justify-between">
        <div className="text-base">CONVERSION LOG</div>
        <div className="flex items-center gap-3">
          <div className="text-xs text-neutral-100/70">{totalLog} LOGGED</div>
          <Button variant={'outline'} className={'text-neutral-100/50 text-xs rounded-md h-7 py-3.25 border border-neutral-500'}>CLEAR ALL</Button>
        </div>
      </div>

      <div className="space-y-3">
        <LogCard timestamp={new Date(Date.now() - 5 * 3600 * 1000)} base={"USD"} quote={'EUR'} sendAmount={1000} receiveAmount={598} />
        <LogCard timestamp={new Date(Date.now() - 5 * 3600 * 1000)} base={"USD"} quote={'EUR'} sendAmount={1000} receiveAmount={598} />
        <LogCard timestamp={new Date(Date.now() - 5 * 3600 * 1000)} base={"USD"} quote={'EUR'} sendAmount={1000} receiveAmount={598} />
        <LogCard timestamp={new Date(Date.now() - 5 * 3600 * 1000)} base={"USD"} quote={'EUR'} sendAmount={1000} receiveAmount={598} />
        <LogCard timestamp={new Date(Date.now() - 5 * 3600 * 1000)} base={"USD"} quote={'EUR'} sendAmount={1000} receiveAmount={598} />
        <LogCard timestamp={new Date(Date.now() - 5 * 3600 * 1000)} base={"USD"} quote={'EUR'} sendAmount={1000} receiveAmount={598} />
        <LogCard timestamp={new Date(Date.now() - 5 * 3600 * 1000)} base={"USD"} quote={'EUR'} sendAmount={1000} receiveAmount={598} />
        <LogCard timestamp={new Date(Date.now() - 5 * 3600 * 1000)} base={"USD"} quote={'EUR'} sendAmount={1000} receiveAmount={598} />
      </div>
    </div>
  );
}