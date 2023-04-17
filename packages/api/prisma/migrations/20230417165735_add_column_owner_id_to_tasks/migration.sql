/*
  Warnings:

  - Added the required column `owner_id` to the `tasks` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_tasks" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "ulid" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    "deleted_at" DATETIME,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "done" BOOLEAN NOT NULL,
    "deadline_at" DATETIME,
    "owner_id" INTEGER NOT NULL,
    CONSTRAINT "tasks_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_tasks" ("created_at", "deadline_at", "deleted_at", "description", "done", "id", "title", "ulid", "updated_at") SELECT "created_at", "deadline_at", "deleted_at", "description", "done", "id", "title", "ulid", "updated_at" FROM "tasks";
DROP TABLE "tasks";
ALTER TABLE "new_tasks" RENAME TO "tasks";
CREATE UNIQUE INDEX "tasks_ulid_key" ON "tasks"("ulid");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
