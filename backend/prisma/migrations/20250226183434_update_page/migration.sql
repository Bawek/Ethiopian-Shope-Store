-- Drop the incorrect table
DROP TABLE IF EXISTS "Mypage";

-- Create the corrected table
CREATE TABLE "MyPage" (
    "id" SERIAL PRIMARY KEY,
    "templateId" INTEGER NOT NULL,
    "js" TEXT,
    "css" TEXT NOT NULL,
    "html" TEXT NOT NULL,
    "name" TEXT
);

