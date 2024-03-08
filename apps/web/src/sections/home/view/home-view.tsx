'use client';
import { Minimal } from "@rfjs/minimal";
import MainLayout from "apps/web/src/layouts/main";

export default function HomeView() {
  return (
    <MainLayout>
      <Minimal id={'welcome'} />
    </MainLayout>
  )
}