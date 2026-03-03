import { noticePosts } from "@/data/noticePosts";
import { Button } from "@/components/ui/button";
import SupportDevNotice from "@/components/support/SupportDevNotice";
import { Input } from "@/components/ui/input";
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

export default function Notice() {
  const [, navigate] = useLocation();
  const [currentPage, setCurrentPage] = useState(1);
  const [isAdmin, setIsAdmin] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [appliedSearchTerm, setAppliedSearchTerm] = useState("");

  useEffect(() => {
    setIsAdmin(window.localStorage.getItem("isAdmin") === "true");
  }, []);

  const itemsPerPage = 10;
  const filteredPosts = useMemo(() => {
    const keyword = appliedSearchTerm.trim().toLowerCase();
    if (!keyword) return noticePosts;
    return noticePosts.filter((post) =>
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
    <section id="notice" className="py-20 md:py-28 bg-white">
      <div className="container">
        <div className="text-center mb-14">
          <h1 className="text-3xl md:text-4xl font-bold">{"\uACF5\uC9C0\uC0AC\uD56D"}</h1>
          <div className="divider-modern mx-auto w-24 mb-6" />
        </div>

        <SupportDevNotice />

        <div className="mb-4 flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            {"\uC804\uCCB4 \uAC8C\uC2DC\uAE00 "}<span className="font-semibold">{totalCount}</span>
            {"\uAC74"}
          </p>
          {isAdmin ? (
            <Button
              asChild
              type="button"
              variant="outline"
              className="hover:bg-gray-100 hover:text-foreground"
            >
              <Link href="/notice/write">{"\uAE00\uC4F0\uAE30"}</Link>
            </Button>
          ) : (
            <div />
          )}
        </div>

        <form onSubmit={handleSearchSubmit} className="mb-4 flex max-w-md items-center gap-2">
          <Input
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder={"\uC81C\uBAA9, \uC791\uC131\uC790 \uAC80\uC0C9"}
          />
          <Button
            type="submit"
            className="bg-[#0b1f4d] text-white hover:bg-[#13357a]"
            aria-label={"\uAC80\uC0C9"}
          >
            <SearchIcon className="size-4" />
            <span className="sr-only">{"\uAC80\uC0C9"}</span>
          </Button>
          <Button
            type="button"
            variant="outline"
            className="hover:bg-gray-100 hover:text-foreground"
            onClick={handleSearchReset}
            aria-label={"\uCD08\uAE30\uD654"}
          >
            <RefreshCwIcon className="size-4" />
            <span className="sr-only">{"\uCD08\uAE30\uD654"}</span>
          </Button>
        </form>

        <div className="rounded-lg border border-border/70 bg-background">
          <Table>
            <TableHeader>
              <TableRow className="bg-[#0b1f4d] hover:bg-[#0b1f4d]">
                <TableHead className="w-20 text-center text-white">{"\uBC88\uD638"}</TableHead>
                <TableHead className="text-white">{"\uC81C\uBAA9"}</TableHead>
                <TableHead className="w-24 text-center text-white">{"\uC791\uC131\uC790"}</TableHead>
                <TableHead className="w-32 text-center text-white">{"\uC791\uC131\uC77C"}</TableHead>
                <TableHead className="w-20 text-center text-white">{"\uC870\uD68C"}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentPosts.map((post) => (
                <TableRow
                  key={post.id}
                  className="cursor-pointer"
                  onClick={() => navigate(`/notice/${post.id}`)}
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
