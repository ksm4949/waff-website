import { Button } from "@/components/ui/button";
import SupportDevNotice from "@/components/support/SupportDevNotice";
import { Input } from "@/components/ui/input";
import { qnaPosts } from "@/data/qnaPosts";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useEffect, useMemo, useState } from "react";
import { Link, useLocation } from "wouter";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { RefreshCwIcon, SearchIcon } from "lucide-react";

export default function QnA() {
  const [, navigate] = useLocation();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchInput, setSearchInput] = useState("");
  const [appliedSearchTerm, setAppliedSearchTerm] = useState("");

  const itemsPerPage = 10;
  const filteredPosts = useMemo(() => {
    const keyword = appliedSearchTerm.trim().toLowerCase();
    if (!keyword) return qnaPosts;
    return qnaPosts.filter((post) =>
      [post.title, post.author].some((field) =>
        field.toLowerCase().includes(keyword)
      )
    );
  }, [appliedSearchTerm]);
  const totalCount = filteredPosts.length;
  const totalPages = Math.max(1, Math.ceil(filteredPosts.length / itemsPerPage));
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentPosts = filteredPosts.slice(startIndex, startIndex + itemsPerPage);

  const goToPage = (page: number) => {
    const nextPage = Math.min(Math.max(page, 1), totalPages);
    setCurrentPage(nextPage);
  };

  const paginationBaseClass =
    "border border-border bg-white text-black hover:bg-[#0b1f4d] hover:text-white";
  const paginationActiveClass =
    "border border-[#0b1f4d] bg-[#0b1f4d] text-white hover:bg-[#0b1f4d] hover:text-white";

  useEffect(() => {
    setCurrentPage(1);
  }, [appliedSearchTerm]);

  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setAppliedSearchTerm(searchInput);
  };

  const handleSearchReset = () => {
    setSearchInput("");
    setAppliedSearchTerm("");
    setCurrentPage(1);
  };

  return (
    <section id="qna" className="py-20 md:py-28 bg-white">
      <div className="container">
        <div className="text-center mb-14">
          <h1 className="text-3xl md:text-4xl font-bold">Q & A</h1>
          <div className="divider-modern mx-auto w-24 mb-6" />
        </div>

        <SupportDevNotice />

        <div className="mb-4 flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            {"전체 게시글 "}<span className="font-semibold">{totalCount}</span>
            {"건"}
          </p>
          <Button asChild type="button" variant="outline" className="hover:bg-gray-100 hover:text-foreground">
            <Link href="/qna/write">{"글쓰기"}</Link>
          </Button>
        </div>

        <form onSubmit={handleSearchSubmit} className="mb-4 flex max-w-md items-center gap-2">
          <Input
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder={"제목, 작성자 검색"}
          />
          <Button
            type="submit"
            className="bg-[#0b1f4d] text-white hover:bg-[#13357a]"
            aria-label={"검색"}
          >
            <SearchIcon className="size-4" />
            <span className="sr-only">{"검색"}</span>
          </Button>
          <Button
            type="button"
            variant="outline"
            className="hover:bg-gray-100 hover:text-foreground"
            onClick={handleSearchReset}
            aria-label={"초기화"}
          >
            <RefreshCwIcon className="size-4" />
            <span className="sr-only">{"초기화"}</span>
          </Button>
        </form>

        <div className="rounded-lg border border-border/70 bg-background">
          <Table>
            <TableHeader>
              <TableRow className="bg-[#0b1f4d] hover:bg-[#0b1f4d]">
                <TableHead className="w-20 text-center text-white">{"번호"}</TableHead>
                <TableHead className="text-white">{"제목"}</TableHead>
                <TableHead className="w-24 text-center text-white">{"작성자"}</TableHead>
                <TableHead className="w-32 text-center text-white">{"작성일"}</TableHead>
                <TableHead className="w-20 text-center text-white">{"조회"}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentPosts.map((post) => (
                <TableRow
                  key={post.id}
                  className="cursor-pointer"
                  onClick={() => navigate(`/qna/${post.id}/verify`)}
                >
                  <TableCell className="text-center">{post.id}</TableCell>
                  <TableCell className="font-medium">{post.title}</TableCell>
                  <TableCell className="text-center">{post.author}</TableCell>
                  <TableCell className="text-center">{post.date}</TableCell>
                  <TableCell className="text-center">{post.views}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className="mt-6">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    goToPage(currentPage - 1);
                  }}
                  className={`${paginationBaseClass} ${
                    currentPage === 1 ? "pointer-events-none opacity-50" : ""
                  }`}
                />
              </PaginationItem>

              {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
                <PaginationItem key={page}>
                  <PaginationLink
                    href="#"
                    isActive={page === currentPage}
                    onClick={(e) => {
                      e.preventDefault();
                      goToPage(page);
                    }}
                    className={page === currentPage ? paginationActiveClass : paginationBaseClass}
                  >
                    {page}
                  </PaginationLink>
                </PaginationItem>
              ))}

              <PaginationItem>
                <PaginationNext
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    goToPage(currentPage + 1);
                  }}
                  className={`${paginationBaseClass} ${
                    currentPage === totalPages ? "pointer-events-none opacity-50" : ""
                  }`}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>
    </section>
  );
}
