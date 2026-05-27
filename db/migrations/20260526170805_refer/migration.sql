/*
  Warnings:

  - The `role` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - A unique constraint covering the columns `[mobileNumber]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[referCode]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Changed the type of `type` on the `Token` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `mobileNumber` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `referCode` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "TokenType" AS ENUM ('RESET_PASSWORD');

-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'PLAYER', 'TEAM_OWNER', 'TEAM_MANAGER', 'COACH', 'ANALYST', 'TOURNAMENT_ORGANIZER', 'MODERATOR', 'SUPPORT', 'STREAMER', 'CASTER', 'SPONSOR', 'VERIFIED_USER', 'CONTENT_CREATOR', 'ADMIN', 'SUPER_ADMIN');

-- CreateEnum
CREATE TYPE "AccountStatus" AS ENUM ('ACTIVE', 'SUSPENDED', 'BANNED', 'PENDING_VERIFICATION');

-- CreateEnum
CREATE TYPE "GameType" AS ENUM ('PUBG', 'BGMI', 'FREE_FIRE', 'COD', 'VALORANT', 'FORTNITE', 'DOTA_2', 'CS2');

-- CreateEnum
CREATE TYPE "MatchMode" AS ENUM ('SOLO', 'DUO', 'SQUAD');

-- CreateEnum
CREATE TYPE "TournamentStatus" AS ENUM ('UPCOMING', 'REGISTRATION_OPEN', 'REGISTRATION_CLOSED', 'ROOM_CREATED', 'LIVE', 'RESULT_PENDING', 'COMPLETED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "ParticipantStatus" AS ENUM ('JOINED', 'LEFT', 'DISQUALIFIED');

-- CreateEnum
CREATE TYPE "PaymentStatus" AS ENUM ('PENDING', 'SUCCESS', 'FAILED', 'REFUNDED');

-- CreateEnum
CREATE TYPE "BalanceBucket" AS ENUM ('MAIN', 'WINNING', 'BONUS');

-- CreateEnum
CREATE TYPE "WalletLedgerType" AS ENUM ('DEPOSIT', 'TOURNAMENT_JOIN', 'WINNING', 'BONUS', 'WITHDRAWAL', 'REFUND', 'PENALTY', 'REFERRAL_BONUS');

-- CreateEnum
CREATE TYPE "WithdrawalStatus" AS ENUM ('PENDING', 'APPROVED', 'REJECTED', 'PAID');

-- CreateEnum
CREATE TYPE "KYCStatus" AS ENUM ('PENDING', 'VERIFIED', 'REJECTED');

-- CreateEnum
CREATE TYPE "BanReason" AS ENUM ('CHEATING', 'FRAUD', 'MULTI_ACCOUNT', 'ABUSE', 'SUSPICIOUS_ACTIVITY', 'OTHER');

-- CreateEnum
CREATE TYPE "BanType" AS ENUM ('TEMPORARY', 'PERMANENT');

-- CreateEnum
CREATE TYPE "NotificationType" AS ENUM ('TOURNAMENT_START', 'TOURNAMENT_RESULT', 'WALLET_CREDIT', 'WALLET_DEBIT', 'KYC_UPDATE', 'WITHDRAWAL_UPDATE', 'REFERRAL_REWARD', 'SYSTEM', 'BAN', 'TICKET_UPDATE', 'DISPUTE_UPDATE', 'PROMO_APPLIED');

-- CreateEnum
CREATE TYPE "TeamRole" AS ENUM ('CAPTAIN', 'MEMBER');

-- CreateEnum
CREATE TYPE "ReferralRewardStatus" AS ENUM ('PENDING', 'REWARDED', 'FAILED');

-- CreateEnum
CREATE TYPE "GameProfileStatus" AS ENUM ('PENDING', 'VERIFIED', 'REJECTED');

-- CreateEnum
CREATE TYPE "DevicePlatform" AS ENUM ('ANDROID', 'IOS', 'WEB', 'WINDOWS', 'MACOS', 'LINUX', 'TABLET', 'SMART_TV', 'DESKTOP', 'UNKNOWN');

-- CreateEnum
CREATE TYPE "TicketStatus" AS ENUM ('OPEN', 'IN_PROGRESS', 'WAITING_FOR_USER', 'RESOLVED', 'CLOSED');

-- CreateEnum
CREATE TYPE "TicketPriority" AS ENUM ('LOW', 'MEDIUM', 'HIGH', 'URGENT');

-- CreateEnum
CREATE TYPE "TicketCategory" AS ENUM ('PAYMENT_ISSUE', 'WITHDRAWAL_ISSUE', 'TOURNAMENT_DISPUTE', 'ACCOUNT_ISSUE', 'KYC_ISSUE', 'TECHNICAL_BUG', 'CHEATING_REPORT', 'REWARD_NOT_RECEIVED', 'GENERAL_INQUIRY', 'OTHER');

-- CreateEnum
CREATE TYPE "TicketMessageSender" AS ENUM ('USER', 'SUPPORT', 'SYSTEM');

-- CreateEnum
CREATE TYPE "RoundStatus" AS ENUM ('UPCOMING', 'LIVE', 'COMPLETED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "DisputeStatus" AS ENUM ('PENDING', 'UNDER_REVIEW', 'ACCEPTED', 'REJECTED');

-- CreateEnum
CREATE TYPE "DiscountType" AS ENUM ('FLAT', 'PERCENT');

-- CreateEnum
CREATE TYPE "BatchStatus" AS ENUM ('PENDING', 'PROCESSING', 'COMPLETED', 'FAILED');

-- CreateEnum
CREATE TYPE "ReportReason" AS ENUM ('CHEATING', 'HACKING', 'ABUSIVE_LANGUAGE', 'INAPPROPRIATE_NAME', 'MULTI_ACCOUNT', 'MATCH_FIXING', 'OTHER');

-- CreateEnum
CREATE TYPE "ReportStatus" AS ENUM ('PENDING', 'REVIEWED', 'ACTIONED', 'DISMISSED');

-- CreateEnum
CREATE TYPE "ConfigDataType" AS ENUM ('STRING', 'NUMBER', 'BOOLEAN', 'JSON');

-- AlterTable
ALTER TABLE "Token" DROP COLUMN "type",
ADD COLUMN     "type" "TokenType" NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "accountStatus" "AccountStatus" NOT NULL DEFAULT 'ACTIVE',
ADD COLUMN     "mobileNumber" TEXT NOT NULL,
ADD COLUMN     "referCode" TEXT NOT NULL,
DROP COLUMN "role",
ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'USER';

-- CreateIndex
CREATE UNIQUE INDEX "Token_hashedToken_type_key" ON "Token"("hashedToken", "type");

-- CreateIndex
CREATE UNIQUE INDEX "User_mobileNumber_key" ON "User"("mobileNumber");

-- CreateIndex
CREATE UNIQUE INDEX "User_referCode_key" ON "User"("referCode");
