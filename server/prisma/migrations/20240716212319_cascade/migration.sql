-- DropForeignKey
ALTER TABLE "Signature" DROP CONSTRAINT "Signature_postId_fkey";

-- DropForeignKey
ALTER TABLE "Signature" DROP CONSTRAINT "Signature_userId_fkey";

-- AddForeignKey
ALTER TABLE "Signature" ADD CONSTRAINT "Signature_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Signature" ADD CONSTRAINT "Signature_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
