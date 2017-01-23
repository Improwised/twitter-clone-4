--
-- PostgreSQL database dump
--

-- Dumped from database version 9.6.1
-- Dumped by pg_dump version 9.6.1

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET search_path = public, pg_catalog;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: login; Type: TABLE; Schema: public; Owner: nidhi
--

CREATE TABLE login (
    id integer NOT NULL,
    username text,
    mobileno integer,
    password character varying
);


ALTER TABLE login OWNER TO nidhi;

--
-- Name: login_id_seq; Type: SEQUENCE; Schema: public; Owner: nidhi
--

CREATE SEQUENCE login_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE login_id_seq OWNER TO nidhi;

--
-- Name: login_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: nidhi
--

ALTER SEQUENCE login_id_seq OWNED BY login.id;


--
-- Name: login id; Type: DEFAULT; Schema: public; Owner: nidhi
--

ALTER TABLE ONLY login ALTER COLUMN id SET DEFAULT nextval('login_id_seq'::regclass);


--
-- Data for Name: login; Type: TABLE DATA; Schema: public; Owner: nidhi
--

COPY login (id, username, mobileno, password) FROM stdin;
\.


--
-- Name: login_id_seq; Type: SEQUENCE SET; Schema: public; Owner: nidhi
--

SELECT pg_catalog.setval('login_id_seq', 1, false);


--
-- Name: login login_pkey; Type: CONSTRAINT; Schema: public; Owner: nidhi
--

ALTER TABLE ONLY login
    ADD CONSTRAINT login_pkey PRIMARY KEY (id);


--
-- PostgreSQL database dump complete
--

