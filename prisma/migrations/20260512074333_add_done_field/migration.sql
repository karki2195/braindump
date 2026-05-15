-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Dump" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "text" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "done" BOOLEAN NOT NULL DEFAULT false
);
INSERT INTO "new_Dump" ("createdAt", "id", "text") SELECT "createdAt", "id", "text" FROM "Dump";
DROP TABLE "Dump";
ALTER TABLE "new_Dump" RENAME TO "Dump";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
