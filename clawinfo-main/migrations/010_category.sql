-- 添加 category 列到 digests 表
ALTER TABLE digests ADD COLUMN category TEXT DEFAULT 'all' CHECK(category IN ('all', 'ai', 'crypto', 'binance'));

CREATE INDEX IF NOT EXISTS idx_digests_category ON digests(category);
