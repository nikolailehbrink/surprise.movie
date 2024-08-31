import { cn } from "@/lib/utils";

type Props = {
  delay?: number;
  className?: string;
};

export default function QuestionCard({ delay, className }: Props) {
  return (
    <div
      style={{ animationDelay: delay + "ms" }}
      className={cn(
        "flex aspect-[2/3] h-full animate-pulse items-center justify-center rounded-xl bg-neutral-800 text-neutral-700",
        className,
      )}
    >
      <svg
        className="w-1/3 max-w-[120px] fill-current"
        viewBox="0 0 98 142"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M29.5342 96.7324V93.4991C29.5342 86.0892 30.116 80.1837 31.2794 75.7827C32.4429 71.3817 34.1658 67.8564 36.4479 65.2068C38.7301 62.5123 41.5269 60.0873 44.8384 57.9317C47.7023 56.0455 50.253 54.2268 52.4904 52.4753C54.7726 50.7239 56.5626 48.8602 57.8603 46.8843C59.2027 44.9083 59.874 42.6629 59.874 40.148C59.874 37.9026 59.337 35.9266 58.263 34.2201C57.189 32.5136 55.7347 31.1888 53.9 30.2457C52.0653 29.3027 50.0292 28.8311 47.7918 28.8311C45.3753 28.8311 43.1379 29.3925 41.0795 30.5152C39.0658 31.6379 37.4324 33.1872 36.1794 35.1632C34.9712 37.1392 34.3671 39.4295 34.3671 42.0342H0C0.0894976 32.1543 2.32694 24.1382 6.71233 17.9858C11.0977 11.7884 16.9151 7.2527 24.1644 4.37856C31.4137 1.45952 39.379 0 48.0603 0C57.6365 0 66.1836 1.41461 73.7014 4.24384C81.2192 7.02815 87.1484 11.2495 91.489 16.908C95.8297 22.5215 98 29.5497 98 37.9924C98 43.4263 97.0603 48.209 95.1808 52.3406C93.3461 56.4273 90.7731 60.0424 87.4616 63.186C84.195 66.2846 80.3689 69.1139 75.9836 71.6736C72.7616 73.5598 70.0543 75.5133 67.8616 77.5342C65.6689 79.5101 64.0132 81.778 62.8945 84.3378C61.7758 86.8526 61.2164 89.9064 61.2164 93.4991V96.7324H29.5342ZM45.9123 142C40.7215 142 36.269 140.181 32.5548 136.544C28.8854 132.861 27.0731 128.393 27.1178 123.139C27.0731 118.019 28.8854 113.64 32.5548 110.003C36.269 106.365 40.7215 104.546 45.9123 104.546C50.8347 104.546 55.1753 106.365 58.9342 110.003C62.7379 113.64 64.6621 118.019 64.7068 123.139C64.6621 126.641 63.7447 129.83 61.9548 132.704C60.2096 135.533 57.9274 137.801 55.1082 139.508C52.289 141.169 49.2237 142 45.9123 142Z" />
      </svg>
    </div>
  );
}