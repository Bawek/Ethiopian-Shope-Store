import * as React from "react";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { PromptForm } from "./PromptForm";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Prompt2 from "./Prompt2";
import Prompt3 from "./Prompt3";

export function PromptCard({ link, prompt, skip }) {
  return (
    <Card className="w-[750px] h-[600px] flex flex-col gap-y-4 justify-center items-center shadow-lg">
      {prompt == "prompt1" && (
        <CardHeader className="mb-5">
          <CardTitle>Select Type of Shop</CardTitle>
        </CardHeader>
      )}
      <CardContent>
        {/* {prompt == "prompt1" ? <PromptForm link={link} /> : <Prompt2 /> } */}
        {prompt == "prompt1" ? (
          <PromptForm link={link} />
        ) : prompt == "prompt2" ? (
          <Prompt2 link={link} />
        ) : (
          prompt == "prompt3" && <Prompt3 link={link} />
        )}
      </CardContent>
      <CardFooter className="flex justify-between gap-4">
        {prompt === "prompt2" ? (
          <div></div>
        ) : prompt === "prompt1" ? (
          <Button variant="outline">
            <Link href={skip}>skip</Link>
          </Button>
        ) : null}
        {prompt !== "prompt3" && prompt !== "prompt2" && (
          <Button asChild>
            <Link href={link}>Next</Link>
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
