import type { PaginationMeta } from "@/types/data_type";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "./pagination";

interface Props {
  meta: PaginationMeta | null;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

const PaginationLayout = ({ meta, setPage }: Props) => {
  if (!meta) return null;

  return (
    <Pagination className="flex justify-end items-center">
      <PaginationContent>
        {/* PREVIOUS */}
        <PaginationPrevious
          onClick={(e) => {
            e.preventDefault();
            if (!meta.has_prev) return;
            setPage((p) => p - 1);
          }}
          className={
            !meta.has_prev
              ? "pointer-events-none opacity-50"
              : "cursor-pointer"
          }
        />

        {/* PAGE INFO */}
        <PaginationItem className="px-3 text-sm font-medium">
          Page {meta.page} / {meta.total_pages}
        </PaginationItem>

        {/* NEXT */}
        <PaginationNext
          onClick={(e) => {
            e.preventDefault();
            if (!meta.has_next) return;
            setPage((p) => p + 1);
          }}
          className={
            !meta.has_next
              ? "pointer-events-none opacity-50"
              : "cursor-pointer"
          }
        />
      </PaginationContent>
    </Pagination>
  );
};

export default PaginationLayout;
