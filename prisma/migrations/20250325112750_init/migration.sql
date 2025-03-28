/*
  Warnings:

  - Added the required column `figmalink` to the `Project` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Project" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "tool" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "githublink" TEXT NOT NULL,
    "figmalink" TEXT NOT NULL,
    "demolink" TEXT NOT NULL,
    "createDate" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Project" ("createDate", "demolink", "githublink", "id", "image", "name", "tool") SELECT "createDate", "demolink", "githublink", "id", "image", "name", "tool" FROM "Project";
DROP TABLE "Project";
ALTER TABLE "new_Project" RENAME TO "Project";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
