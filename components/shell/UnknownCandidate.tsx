"use client";

import Form from "next/form";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useBoardHref } from "./BrandLink";
import MessagePage from "./MessagePage";
import { SearchIcon } from "./icons";

// A report address with no candidate behind it (M2): say so, offer the way back and a search.
export default function UnknownCandidate() {
  const params = useParams<{ candidateId: string }>();
  const reference = decodeURIComponent(params.candidateId ?? "");
  const boardHref = useBoardHref();

  return (
    <MessagePage
      heading={
        <>
          No candidate with reference <span className="text-brand-text">{reference}</span>
        </>
      }
      detail="The link may have a typo, or it may be an old link to someone who's no longer listed. Check the reference, or find the candidate in the full list."
      actions={
        <Link href={boardHref} className="btn btn-primary">
          All candidates
        </Link>
      }
    >
      <Form action="/" role="search" className="mt-7 border-t border-line pt-7">
        <label className="flex h-[46px] w-full max-w-[420px] items-center gap-2 rounded-full bg-shade pr-2 pl-4 text-ink-3 focus-within:outline-3 focus-within:outline-offset-2 focus-within:outline-ink min-[760px]:h-[42px]">
          <SearchIcon className="size-4 flex-none" />
          <span className="sr">Search by name or reference</span>
          <input
            type="search"
            name="q"
            placeholder="Search by name or reference"
            autoComplete="off"
            spellCheck={false}
            enterKeyHint="search"
            className="h-full min-w-0 flex-1 border-0 bg-transparent text-[15px] text-ink outline-none placeholder:text-ink-3"
          />
        </label>
      </Form>
    </MessagePage>
  );
}
