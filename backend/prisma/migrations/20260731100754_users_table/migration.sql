-- CreateTable
CREATE TABLE "Users" (
    "id" SERIAL NOT NULL,
    "cfUsername" TEXT NOT NULL,
    "loginTime" TIMESTAMP(3) NOT NULL,
    "userRating" INTEGER NOT NULL,
    "problemsSolved" INTEGER NOT NULL,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_cfUsername_key" ON "Users"("cfUsername");
