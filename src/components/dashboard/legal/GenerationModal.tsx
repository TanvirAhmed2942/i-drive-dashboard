"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { FileText, AlertCircle, Check, Loader2 } from "lucide-react";

const TAX_YEAR = "2025";
const TOTAL_DRIVERS = 8;
const PENDING_FORMS = 2;
const TOTAL_EARNINGS = "$521k";

const INFO_BULLETS = [
  "All 1099-NEC forms will be generated for drivers with earnings over $600",
  "Forms will be automatically saved to the system",
  "Drivers will receive email and app notifications with download links",
  "This process may take a few minutes",
];

type ModalStep = "initial" | "generating" | "success";

type GenerationModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
};

export function GenerationModal({
  open,
  onOpenChange,
  onSuccess,
}: GenerationModalProps) {
  const [step, setStep] = React.useState<ModalStep>("initial");
  const [progress, setProgress] = React.useState(0);
  const [currentRecord, setCurrentRecord] = React.useState(0);

  const handleOpenChange = (next: boolean) => {
    if (!next && step === "success") onSuccess?.();
    if (!next) setStep("initial");
    onOpenChange(next);
  };

  const handleGenerate = () => {
    setStep("generating");
    setProgress(0);
    setCurrentRecord(0);
    const totalRecords = TOTAL_DRIVERS;
    let count = 0;
    const timer = setInterval(() => {
      count += 1;
      const pct = Math.min(100, Math.round((count / totalRecords) * 100));
      setProgress(pct);
      setCurrentRecord(Math.min(count, totalRecords));
      if (count >= totalRecords) {
        clearInterval(timer);
        setStep("success");
      }
    }, 500);
  };

  const handleCloseSuccess = () => {
    onSuccess?.();
    onOpenChange(false);
    setStep("initial");
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent
        className="max-w-md border-white/10 bg-[#10162B] text-white"
        showCloseButton={step !== "generating"}
      >
        <DialogHeader>
          <div className="flex items-center gap-2">
            <FileText className="size-5 text-blue-400" />
            <DialogTitle className="text-xl font-bold text-white">
              Generate All 1099 Forms
            </DialogTitle>
          </div>
          <DialogDescription className="text-sm text-zinc-400">
            Tax Year {TAX_YEAR}
          </DialogDescription>
        </DialogHeader>

        {step === "initial" && (
          <>
            <div className="grid grid-cols-3 gap-3">
              <div className="rounded-lg border border-white/10 bg-white/5 p-3 text-center">
                <p className="text-xl font-bold text-white">{TOTAL_DRIVERS}</p>
                <p className="text-xs text-zinc-500">Total Drivers</p>
              </div>
              <div className="rounded-lg border border-white/10 bg-white/5 p-3 text-center">
                <p className="text-xl font-bold text-amber-400">{PENDING_FORMS}</p>
                <p className="text-xs text-zinc-500">Pending Forms</p>
              </div>
              <div className="rounded-lg border border-white/10 bg-white/5 p-3 text-center">
                <p className="text-xl font-bold text-emerald-400">{TOTAL_EARNINGS}</p>
                <p className="text-xs text-zinc-500">Total Earnings</p>
              </div>
            </div>
            <div className="rounded-lg border border-blue-500/30 bg-blue-500/10 p-3">
              <div className="flex gap-2">
                <AlertCircle className="size-5 shrink-0 text-blue-400" />
                <div className="space-y-1 text-sm text-zinc-300">
                  <p className="font-medium text-white">Important Information</p>
                  <ul className="list-inside list-disc space-y-0.5 text-xs">
                    {INFO_BULLETS.map((bullet, i) => (
                      <li key={i}>{bullet}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            <DialogFooter className="gap-2 sm:gap-0">
              <Button
                variant="outline"
                className="border-white/20 text-white hover:bg-white/10"
                onClick={() => onOpenChange(false)}
              >
                Cancel
              </Button>
              <Button
                className="bg-blue-600 hover:bg-blue-700"
                onClick={handleGenerate}
              >
                Generate All Forms
              </Button>
            </DialogFooter>
          </>
        )}

        {step === "generating" && (
          <div className="flex flex-col items-center gap-6 py-4">
            <Loader2 className="size-12 animate-spin text-blue-500" />
            <div className="text-center space-y-1">
              <p className="font-medium text-white">Generating 1099 Forms...</p>
              <p className="text-sm text-zinc-500">
                Please wait while we process all records
              </p>
            </div>
            <div className="w-full space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-zinc-400">Progress</span>
                <span className="text-white">{progress}%</span>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-white/10">
                <div
                  className="h-full rounded-full bg-blue-600 transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <p className="text-xs text-zinc-500">
                Processing {currentRecord} of {TOTAL_DRIVERS} records
              </p>
            </div>
          </div>
        )}

        {step === "success" && (
          <div className="flex flex-col items-center gap-6 py-2">
            <div className="flex size-16 items-center justify-center rounded-full bg-emerald-600">
              <Check className="size-8 text-white" />
            </div>
            <div className="text-center space-y-1">
              <p className="text-lg font-semibold text-white">
                Forms Generated Successfully!
              </p>
              <p className="text-sm text-zinc-500">
                All 1099 forms have been created and saved
              </p>
            </div>
            <div className="flex w-full gap-4 rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-4 py-3">
              <div className="flex-1 text-center">
                <p className="text-lg font-bold text-emerald-400">8</p>
                <p className="text-xs text-zinc-400">Forms Created</p>
              </div>
              <div className="flex-1 text-center">
                <p className="text-lg font-bold text-emerald-400">8</p>
                <p className="text-xs text-zinc-400">Emails Sent</p>
              </div>
              <div className="flex-1 text-center">
                <p className="text-lg font-bold text-amber-400">0</p>
                <p className="text-xs text-zinc-400">Failed</p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm text-zinc-400">
              <Check className="size-4 text-emerald-400" />
              <span>All drivers have been notified via email and app</span>
            </div>
            <Button
              className="w-full bg-emerald-600 hover:bg-emerald-700"
              onClick={handleCloseSuccess}
            >
              Close
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
