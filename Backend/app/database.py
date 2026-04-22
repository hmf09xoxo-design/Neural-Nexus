from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base
import os
from dotenv import load_dotenv

load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL", "")

# Supabase / PostgreSQL needs sslmode; SQLite needs none
_connect_args = {}
_pool_kwargs: dict = {"pool_pre_ping": True, "pool_recycle": 1800}

if DATABASE_URL.startswith("postgresql"):
    _connect_args = {"sslmode": "require"}
    _pool_kwargs.update({"pool_size": 5, "max_overflow": 10})

engine = create_engine(
    DATABASE_URL,
    connect_args=_connect_args,
    **_pool_kwargs,
)

SessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine
)

Base = declarative_base()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()