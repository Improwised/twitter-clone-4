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

--
-- Name: registration_id_seq; Type: SEQUENCE; Schema: public; Owner: omprakash
--

CREATE SEQUENCE registration_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE registration_id_seq OWNER TO omprakash;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: registration; Type: TABLE; Schema: public; Owner: omprakash
--

CREATE TABLE registration (
    id character varying DEFAULT nextval('registration_id_seq'::regclass),
    username character varying,
    password character varying,
    email character varying,
    mobile_number integer
);


ALTER TABLE registration OWNER TO omprakash;

--
-- Name: twit; Type: TABLE; Schema: public; Owner: omprakash
--

CREATE TABLE twit (
    user_id character varying DEFAULT 'twit_userid_id_seq'::character varying,
    tweet character varying(140)
);


ALTER TABLE twit OWNER TO omprakash;

--
-- Data for Name: registration; Type: TABLE DATA; Schema: public; Owner: omprakash
--

COPY registration (id, username, password, email, mobile_number) FROM stdin;
1	omprakash	asdf	abc@gmail.com	123456799
\.


--
-- Name: registration_id_seq; Type: SEQUENCE SET; Schema: public; Owner: omprakash
--

SELECT pg_catalog.setval('registration_id_seq', 3, true);


--
-- Data for Name: twit; Type: TABLE DATA; Schema: public; Owner: omprakash
--

COPY twit (user_id, tweet) FROM stdin;
\.


--
-- PostgreSQL database dump complete
--

