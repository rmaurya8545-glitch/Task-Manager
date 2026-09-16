export const STATUS = [
  {
    key: "todo",
    label: "To Do",
    headerAccent: "border-orange-400",
    cardAccent: "border-l-orange-400"
  },
  {
    key: "progress",
    label: "In Progress",
    headerAccent: "border-sky-500",
    cardAccent: "border-l-sky-500"
  },
  {
    key: "done",
    label: "Done",
    headerAccent: "border-green-500",
    cardAccent: "border-l-green-500"
  }
];

export const PRIORITIES = [
  { key: "low", label: "Low", dot: "bg-green-500", border:"border-i-green-500" },
  { key: "medium", label: "Medium", dot: "bg-amber-400", border:"border-l-amber-400" },
  { key: "high", label: "High", dot: "bg-red-500", border:"border-l-red-500" }
];

export function formData(iso){
  if(!iso) return "";
  const d = new Date(iso + "T00:00:00");
  if(isNaN(d)) return iso;
  return d.toLocaleString("en-GB", { day: "2-digit", month:"short"});
}
