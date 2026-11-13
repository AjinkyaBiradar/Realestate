/* eslint-disable @next/next/no-img-element */

export default function Home() {
  return (
    <>
      <a className="btn skip" href="#zayavka">
        Skip to the enquiry form
      </a>

      {/* Floating Liquid-Glass Navigation Bar */}
      <nav className="nav" aria-label="Primary">
        <div className="nav__in">
          <span className="nav__brand">
            LAKE HOUSE <span>· AIST Village</span>
          </span>
          <div className="nav__links">
            <a href="#hero">The house</a>
            <a href="#studio">3D &amp; configurator</a>
            <a href="#okruzhenie">Surroundings</a>
            <a href="#plan">Floor plan</a>
            <a href="#cena">Price</a>
          </div>
          <a className="btn nav__cta" href="#zayavka">
            <span className="btn-l">Book a viewing</span>
            <span className="btn-s">Book</span>
          </a>
        </div>
      </nav>

      {/* ══ HERO SECTION ══ */}
      <header className="hero" id="hero">
        <div className="hero__pin">
          <img
            className="hero__poster"
            id="heroPoster"
            src="/assets/hero/poster.jpg"
            alt="A two-level villa of dark timber and glass on the shore of a mirror-still lake in a pine forest at sunset"
            fetchPriority="high"
            decoding="async"
          />
          <canvas
            className="hero__canvas"
            id="heroCanvas"
            width={2560}
            height={1440}
            aria-hidden="true"
            style={{ opacity: 0 }}
          ></canvas>
          <div className="hero__veil"></div>
          <div className="hero__scrim"></div>
          <div className="hero__grain"></div>

          <div className="hero__copy">
            <div className="wrap">
              <p className="eyebrow" style={{ color: "rgba(251,249,245,.72)" }}>
                Lakeside · pine forest · 12 residences
              </p>
              <h1>
                A house you’ll never
                <br />
                want to leave
              </h1>
              <div className="hero__row">
                <div className="hero__facts">
                  <div>
                    <b>from $800K</b>turnkey
                  </div>
                  <div>
                    <b>420 m²</b>two levels
                  </div>
                  <div>
                    <b>4 bedrooms</b>2 · 4 · 5 to choose from
                  </div>
                  <div>
                    <b>40 minutes</b>to the business district
                  </div>
                </div>
                <a className="btn" href="#zayavka">
                  Book a viewing
                </a>
              </div>
            </div>
          </div>

          <p className="hero__scroll" id="heroHint">
            <span className="wrap">
              <span className="hint">
                <span className="hint__in">
                  <span className="hint__k">Scroll</span>
                  <span className="hint__d" aria-hidden="true">
                    ·
                  </span>
                  <span className="hint__t">the house turns</span>
                  <span className="hint__rail" aria-hidden="true"></span>
                </span>
              </span>
            </span>
          </p>
        </div>
      </header>

      {/* ══ VALUE / PHILOSOPHY SECTION ══ */}
      <section className="sec value" id="dom">
        <div className="wrap">
          <p className="eyebrow">
            Why this isn’t “just another development”
          </p>
          <div className="value__grid">
            <div className="value__i">
              <b>The lake is yours, not shared</b>
              <p>
                A private waterfront and pier. Swim or paddle out right from
                your doorstep — no neighbours on the shore.
              </p>
            </div>
            <div className="value__i">
              <b>The house stands right over the water</b>
              <p>
                The lower deck cantilevers over the lake on piers, and a thin
                sheet of water slides off its edge back into the lake. Life by
                the water below, the quiet of the bedrooms above.
              </p>
            </div>
            <div className="value__i">
              <b>A smart home without a single remote</b>
              <p>
                Light and music follow the rhythm of your day on their own. The
                speakers and sensors are built into the walls.
              </p>
            </div>
            <div className="value__i">
              <b>80% of the plot is untouched forest</b>
              <p>
                The house never shows off: two horizontal volumes hide below the
                tree crowns, and the pine forest stays all around.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ══ ARCHITECTURE / BENTO ══ */}
      <section className="sec">
        <div className="wrap">
          <p className="eyebrow">Architecture</p>
          <h2>The house from every side</h2>
          <div className="bento" style={{ marginTop: "38px" }}>
            <figure className="b-w">
              <img
                src="/assets/img/arch_front.220dc657.webp"
                alt="The villa from the water: two offset volumes of dark timber and glass on piers, water sliding off the deck edge"
                loading="lazy"
                width={1920}
                height={1080}
              />
              <figcaption>
                <b>From the water</b>The lower deck is cantilevered over the
                lake; a thin sheet of water slides off its edge.
              </figcaption>
            </figure>
            <figure className="b-h">
              <img
                src="/assets/img/arch_side.c41b6fba.webp"
                alt="The end of the villa from above: the upper volume shifted off the lower one, cantilevers both ways"
                loading="lazy"
                width={1280}
                height={720}
              />
              <figcaption>
                <b>From the side</b>The upper volume is shifted off the lower
                one — the cantilevers work both ways.
              </figcaption>
            </figure>
            <figure className="b-h">
              <img
                src="/assets/img/arch_back.1373f273.webp"
                alt="The villa from above the forest: two dark roofs below the crowns, the lake beyond"
                loading="lazy"
                width={1280}
                height={720}
              />
              <figcaption>
                <b>From above the pines</b>Seen from the forest side, the house
                hides below the crowns — the lake opens up beyond it.
              </figcaption>
            </figure>
          </div>
          <div className="bento" style={{ marginTop: "16px" }}>
            <figure className="b-a">
              <img
                src="/assets/img/int_living.1dc7ddf2.webp"
                alt="The living room with a glass wall open onto the deck over the lake"
                loading="lazy"
                width={1600}
                height={900}
              />
              <figcaption>
                <b>A wall that opens onto the lake</b>The glass wall slides away
                entirely — the living room continues onto the deck over the
                water.
              </figcaption>
            </figure>
            <figure className="b-b">
              <img
                src="/assets/img/env_pier.4d91ef44.webp"
                alt="A swimming raft on the mirror-still lake, the villa on piers behind"
                loading="lazy"
                width={1280}
                height={720}
              />
              <figcaption>
                <b>Your own swimming raft</b>The water is thirty steps from the
                kitchen.
              </figcaption>
            </figure>
            <figure className="b-c">
              <img
                src="/assets/img/int_spa.3f81d5b0.webp"
                alt="A soaking tub in dark stone by the glass wall facing the lake"
                loading="lazy"
                width={1280}
                height={720}
              />
              <figcaption>
                <b>A spa by the water</b>Instead of a gym membership — a
                soaking tub behind glass, thirty steps from the bedroom.
              </figcaption>
            </figure>
            <figure className="b-d">
              <img
                src="/assets/img/env_dusk.2f5ec773.webp"
                alt="The villa at dusk: two levels of warm light through the glass, reflected in the lake"
                loading="lazy"
                width={1600}
                height={900}
              />
              <figcaption>
                <b>The evening this is built for</b>The oak glows from within
                and doubles itself in the water.
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      {/* ══ KEY SPECS ══ */}
      <section className="sec" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="specs">
            <div>
              <b>420</b>
              <span>m² on two levels</span>
            </div>
            <div>
              <b>4</b>
              <span>bedrooms standard, up to 5</span>
            </div>
            <div>
              <b>3,200</b>
              <span>m² plot, 80% forest</span>
            </div>
            <div>
              <b>40</b>
              <span>minutes to the city</span>
            </div>
            <div>
              <b>3 / 12</b>
              <span>residences available</span>
            </div>
          </div>
        </div>
      </section>

      {/* ══ LIVE 3D + CONFIGURATOR ══ */}
      <section className="sec" id="studio">
        <div className="wrap">
          <p className="eyebrow">Live 3D — drag to rotate</p>
          <h2>Walk around the house and make it yours</h2>
          <p className="lede" style={{ margin: "20px 0 30px" }}>
            This is not a video: it is real three-dimensional geometry. Outside,
            the house turns any way you like — from almost water level to
            straight down from above — and six buttons under the scene put the
            camera on a ready-made angle. Inside you stand in the room and look
            around you; the buttons below move you through the whole house — from
            the fireplace and the kitchen up to the gallery, into the master
            bedroom, its bath and a guest room upstairs, and out onto the deck.
            The buttons on the right change the house itself — area and price
            update instantly.
          </p>

          <div className="studio" id="studio3d">
            <div
              className="studio__tabs"
              role="tablist"
              aria-label="Exterior or interior"
            >
              <button
                className="tab"
                role="tab"
                id="tab-ext"
                aria-controls="stage"
                aria-selected="true"
              >
                Outside
              </button>
              <button
                className="tab"
                role="tab"
                id="tab-int"
                aria-controls="stage"
                aria-selected="false"
              >
                Inside
              </button>
              <span
                style={{
                  marginLeft: "auto",
                  alignSelf: "center",
                  color: "#7d7970",
                  fontSize: "13px",
                }}
                id="roomHint"
              ></span>
            </div>
            <div className="studio__stage" id="stage">
              <canvas id="stageCanvas"></canvas>
              <div className="studio__fallback" data-fallback>
                <p>
                  The 3D walkthrough is not available on this device — here is a
                  still of the house instead. On a desktop it turns with the
                  mouse.
                </p>
              </div>
            </div>
            <div className="studio__views" id="viewHost"></div>
            <div className="studio__panel">
              <div>
                <div className="opt">
                  <div className="opt__t" id="lbl-fin">
                    Finish
                  </div>
                  <div className="opt__row" role="group" aria-labelledby="lbl-fin">
                    <button
                      className="sw"
                      data-k="finish"
                      data-v="warm"
                      aria-pressed="true"
                    >
                      <i style={{ background: "#e6e4dd" }}></i>Warm white
                    </button>
                    <button
                      className="sw"
                      data-k="finish"
                      data-v="graphite"
                      aria-pressed="false"
                    >
                      <i style={{ background: "#3a3b3d" }}></i>Graphite
                    </button>
                    <button
                      className="sw"
                      data-k="finish"
                      data-v="natural"
                      aria-pressed="false"
                    >
                      <i style={{ background: "#c8a877" }}></i>Natural
                    </button>
                  </div>
                </div>
                <div className="opt">
                  <div className="opt__t" id="lbl-bed">
                    Bedrooms
                  </div>
                  <div className="opt__row" role="group" aria-labelledby="lbl-bed">
                    <button
                      className="sw"
                      data-k="bedrooms"
                      data-v="2"
                      aria-pressed="false"
                    >
                      2
                    </button>
                    <button
                      className="sw"
                      data-k="bedrooms"
                      data-v="4"
                      aria-pressed="true"
                    >
                      4
                    </button>
                    <button
                      className="sw"
                      data-k="bedrooms"
                      data-v="5"
                      aria-pressed="false"
                    >
                      5
                    </button>
                  </div>
                </div>
                <div className="opt">
                  <div className="opt__t" id="lbl-spa">
                    Spa &amp; soaking tub
                  </div>
                  <div className="opt__row" role="group" aria-labelledby="lbl-spa">
                    <button
                      className="sw"
                      data-k="hamam"
                      data-v="none"
                      aria-pressed="true"
                    >
                      None
                    </button>
                    <button
                      className="sw"
                      data-k="hamam"
                      data-v="snow"
                      aria-pressed="false"
                    >
                      Snow-white
                    </button>
                    <button
                      className="sw"
                      data-k="hamam"
                      data-v="warm"
                      aria-pressed="false"
                    >
                      Warm stone
                    </button>
                  </div>
                </div>
                <div className="opt">
                  <div className="opt__t" id="lbl-ter">
                    Terrace over the water
                  </div>
                  <div className="opt__row" role="group" aria-labelledby="lbl-ter">
                    <button
                      className="sw"
                      data-k="terrace"
                      data-v="std"
                      aria-pressed="true"
                    >
                      Standard
                    </button>
                    <button
                      className="sw"
                      data-k="terrace"
                      data-v="pool"
                      aria-pressed="false"
                    >
                      With a pool
                    </button>
                  </div>
                </div>
                <div className="opt" style={{ marginBottom: 0 }}>
                  <div className="opt__t" id="lbl-gl">
                    Glazing
                  </div>
                  <div className="opt__row" role="group" aria-labelledby="lbl-gl">
                    <button
                      className="sw"
                      data-k="glazing"
                      data-v="panoramic"
                      aria-pressed="true"
                    >
                      Panoramic
                    </button>
                    <button
                      className="sw"
                      data-k="glazing"
                      data-v="sliding"
                      aria-pressed="false"
                    >
                      + sliding wall
                    </button>
                  </div>
                </div>
                <div className="cfg-sum">
                  <p className="cfg-sum__t" id="configOut"></p>
                  <p className="cfg-sum__p" id="priceOut"></p>
                </div>
              </div>
            </div>
            <div className="studio__foot">
              <span id="stageHint">
                Drag to turn the house · the dots on it open details
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ══ SURROUNDINGS ══ */}
      <section className="sec" id="okruzhenie">
        <div className="wrap">
          <p className="eyebrow">What surrounds you</p>
          <h2>No fence in sight, no neighbours within earshot</h2>
          <div className="bento" style={{ marginTop: "38px" }}>
            <figure className="b-d">
              <img
                src="/assets/img/env_forest.9c62fd40.webp"
                alt="A pine forest with mist between the trunks"
                loading="lazy"
                width={1280}
                height={720}
              />
              <figcaption>
                <b>A forest older than the village</b>The mature pines were
                never cleared for construction — the houses were fitted in
                between them.
              </figcaption>
            </figure>
            <figure className="b-c">
              <img
                src="/assets/img/env_approach.5a91538f.webp"
                alt="A winding stone path through the pines to the villa"
                loading="lazy"
                width={1280}
                height={720}
              />
              <figcaption>
                <b>One winding path</b>Not a single straight line in the
                landscape.
              </figcaption>
            </figure>
            <figure className="b-b">
              <img
                src="/assets/img/hero_terrace.dc94d0c7.webp"
                alt="The villa’s deck cantilevered over the water, water spilling into the lake"
                loading="lazy"
                width={1280}
                height={720}
              />
              <figcaption>
                <b>A deck over the water</b>Dinner above the lake instead of a
                view of a fence.
              </figcaption>
            </figure>
            <figure className="b-a">
              <img
                src="/assets/img/int_stair.a4b81c30.webp"
                alt="The double-height living room with an open staircase by two storeys of glass"
                loading="lazy"
                width={1600}
                height={900}
              />
              <figcaption>
                <b>Double-height glass to the lake</b>An open staircase links
                the levels, the glazing rises two storeys, and the pines stand
                right behind it.
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      {/* ══ ROOMS GALLERY ══ */}
      <section className="sec">
        <div className="wrap">
          <p className="eyebrow">Rooms</p>
          <h2>Every room faces the water</h2>
          <div className="bento" style={{ marginTop: "38px" }}>
            <figure className="b-a">
              <img
                src="/assets/img/int_kitchen.e1d4b5ae.webp"
                alt="The kitchen with a monolithic dark stone island"
                loading="lazy"
                width={1600}
                height={900}
              />
              <figcaption>
                <b>The kitchen</b>An island cut from a single block of dark
                stone, not a handle in sight — and pine trunks behind the glass.
              </figcaption>
            </figure>
            <figure className="b-b">
              <img
                src="/assets/img/int_bedroom.49f50a91.webp"
                alt="An upper-level bedroom: a low platform bed facing the glass, a view over the crowns"
                loading="lazy"
                width={1280}
                height={720}
              />
              <figcaption>
                <b>The bedroom upstairs</b>You wake up above the tree crowns,
                facing the lake — not a wardrobe.
              </figcaption>
            </figure>
            <figure className="b-c">
              <img
                src="/assets/img/int_spa.3f81d5b0.webp"
                alt="The spa soaking tub with clear water in dark stone"
                loading="lazy"
                width={1280}
                height={720}
              />
              <figcaption>
                <b>The spa</b>Dark stone and smoked oak, a teak bench, glass
                right down to the water.
              </figcaption>
            </figure>
            <figure className="b-d">
              <img
                src="/assets/img/int_living.1dc7ddf2.webp"
                alt="The living room with a monolithic fireplace and a low modular sofa"
                loading="lazy"
                width={1600}
                height={900}
              />
              <figcaption>
                <b>The living room</b>A fireplace of one monolithic block, a
                sofa floating above the rug, and oak flowing from outside in as
                a single plane.
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      {/* ══ FLOOR PLAN ══ */}
      <section className="sec" id="plan">
        <div className="wrap">
          <p className="eyebrow">Floor plan</p>
          <h2>Two levels over the water</h2>
          <p className="lede" style={{ maxWidth: "72ch", marginTop: "20px" }}>
            Downstairs — the entrance hall, the island kitchen and the dining
            room right by the water, the double-height living room and the deck
            over the lake. Upstairs — the master bedroom directly above the
            kitchen, the guest rooms behind timber louvres and the gallery over
            the living room. The drawing follows your configuration: the area on
            the sheet is the one in the price panel.
          </p>

          <figure className="plan" id="planFig">
            <div className="plan__bar">
              <div className="plan__tabs" role="tablist" aria-label="Level">
                <button
                  className="ptab"
                  type="button"
                  role="tab"
                  data-level="1"
                  aria-selected="true"
                  aria-controls="planSheet"
                >
                  Level 1
                </button>
                <button
                  className="ptab"
                  type="button"
                  role="tab"
                  data-level="2"
                  aria-selected="false"
                  aria-controls="planSheet"
                >
                  Level 2
                </button>
              </div>
              <p className="plan__sub" id="planSub"></p>
              <p className="plan__area">
                <b id="planArea">219</b>
                <span id="planSqm">m²</span>
              </p>
              <div className="plan__steps">
                <button type="button" id="planZoomOut" aria-label="Zoom out">
                  −
                </button>
                <span id="planZoomVal">100%</span>
                <button type="button" id="planZoomIn" aria-label="Zoom in">
                  +
                </button>
              </div>
              <button
                className="plan__zoom"
                type="button"
                id="planZoom"
                aria-controls="planSheet"
                aria-expanded="false"
              >
                <span data-open>Expand</span>
                <span data-close>Close</span>
              </button>
            </div>
            <div
              className="plan__sheet"
              id="planSheet"
              role="img"
              aria-label="Floor plan"
            >
              <noscript>
                <img
                  src="/assets/plans/en/level1-b4-d.svg"
                  alt="Floor plan"
                  width={3560}
                  height={2500}
                />
              </noscript>
            </div>
            <figcaption className="plan__legend">
              <div className="plan__legend-h">
                <p className="plan__legend-t" id="planExpl">
                  Room schedule
                </p>
                <p className="plan__scale">
                  <a
                    id="planFullSheet"
                    href="/assets/plans/en/level1-b4.svg"
                    target="_blank"
                    rel="noopener"
                  >
                    Full sheet ↗
                  </a>
                </p>
              </div>
              <ol className="plan__rows" id="planRows"></ol>
              <p className="plan__note" id="planNote">
                Decks, terraces and the double-height void are not counted in
                the area
              </p>
            </figcaption>
            <div className="plan__tip" id="planTip" hidden></div>
          </figure>
          <p className="plan__hint">
            Hover a room — its line in the schedule lights up. The kitchen,
            dining room, living room, gallery and deck open in the live 3D.
          </p>
          <p className="plan__hint plan__hint--touch">
            Tap the drawing — it opens full screen, where you can zoom it and
            drag it with a finger.
          </p>
        </div>
      </section>

      {/* ══ AMENITIES & ENGINEERING ══ */}
      <section className="sec">
        <div className="wrap">
          <p className="eyebrow">What’s included</p>
          <h2>Engineering you never see</h2>
          <div className="amen" style={{ marginTop: "38px" }}>
            <div>
              <b>Chameleon glass</b>
              <p>
                Tints at the touch of a button against sun and prying eyes, and
                keeps the heat in. A panorama without curtains or overheating.
              </p>
            </div>
            <div>
              <b>Light that follows the day</b>
              <p>
                Warm amber towards sunset, neutral at midday. Not a single
                visible fixture in the ceiling.
              </p>
            </div>
            <div>
              <b>Sound from the wall</b>
              <p>
                The speakers are plastered in flush — music comes out of a blank
                surface.
              </p>
            </div>
            <div>
              <b>Security 24/7</b>
              <p>A closed perimeter that reads as landscape, not as a fence.</p>
            </div>
            <div>
              <b>Independent utilities</b>
              <p>
                A private well, a septic system, backup power. An outage in the
                village never reaches the house.
              </p>
            </div>
            <div>
              <b>Underfloor heating throughout</b>
              <p>
                The oak stays warm across all 420 m², including the entrance
                terrace.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ══ LOCATION ══ */}
      <section className="sec">
        <div className="wrap">
          <div className="split">
            <figure style={{ margin: 0 }}>
              <img
                src="/assets/img/arch_front.220dc657.webp"
                alt="The villa from the water: two storeys of dark timber and glass, water spilling off the deck edge"
                loading="lazy"
                width={1920}
                height={1080}
                style={{ borderRadius: "var(--r)" }}
              />
            </figure>
            <div>
              <p className="eyebrow">Location</p>
              <h2>Forty minutes — and a different world</h2>
              <p className="lede" style={{ marginTop: "20px" }}>
                The village stands on the shore of a still lake in an old pine
                forest. The business district is 40 minutes away along a
                free-flowing lane; the nearest school and clinic are 12 minutes.
                The city is close. The rush is not.
              </p>
              <div
                className="amen"
                style={{ marginTop: "30px", gridTemplateColumns: "1fr 1fr" }}
              >
                <div>
                  <b>40 min</b>
                  <p>to the business district</p>
                </div>
                <div>
                  <b>12 min</b>
                  <p>to school and clinic</p>
                </div>
                <div>
                  <b>0 m</b>
                  <p>to your own pier</p>
                </div>
                <div>
                  <b>24/7</b>
                  <p>security and a closed perimeter</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ REVIEWS / TESTIMONIALS ══ */}
      <section className="sec">
        <div className="wrap">
          <p className="eyebrow">Who already lives here</p>
          <h2>Nine families out of twelve</h2>
          <div className="quotes" style={{ marginTop: "38px" }}>
            <div className="quote">
              <p>
                “We came to view it in November, in the rain. We slid the glass
                wall open — and it was clear there was nothing left to look
                for.”
              </p>
              <footer>Residence No. 4, living here since spring</footer>
            </div>
            <div className="quote">
              <p>
                “The one thing I never expected: the silence. You hear the water
                and the pines, and that is all. And I get to the office faster
                than I used to across the centre.”
              </p>
              <footer>Residence No. 7</footer>
            </div>
            <div className="quote">
              <p>
                “Coffee on the lower deck right above the water in the morning;
                sunset from the bedroom over the pines at night. Each level
                lives its own life.”
              </p>
              <footer>Residence No. 11</footer>
            </div>
          </div>
        </div>
      </section>

      {/* ══ PRICE + SCARCITY BAR ══ */}
      <section className="sec" id="cena">
        <div className="wrap">
          <div className="split">
            <div>
              <p className="eyebrow">Price</p>
              <h2>From $800K turnkey</h2>
              <p className="lede" style={{ marginTop: "20px" }}>
                The base includes 420 m² on two levels, four bedrooms, full
                engineering, the landscaping and private access to the water.
                Finish, bedrooms, spa and terrace change the final price —
                configure your home above and it will travel into your enquiry.
              </p>
              <div className="scarcity" aria-hidden="true">
                <i className="free"></i>
                <i className="free"></i>
                <i className="free"></i>
                <i></i>
                <i></i>
                <i></i>
                <i></i>
                <i></i>
                <i></i>
                <i></i>
                <i></i>
                <i></i>
              </div>
              <p className="muted">
                3 of 12 residences are available. Two of the three stand on the
                waterline.
              </p>
              <a className="btn" href="#zayavka" style={{ marginTop: "26px" }}>
                Book a viewing
              </a>
            </div>
            <div>
              <div className="amen" style={{ gridTemplateColumns: "1fr" }}>
                <div>
                  <b>What the base includes</b>
                  <p>
                    420 m², 4 bedrooms, the double-height living room, the deck
                    over the water, engineering, landscaping, utility
                    connections.
                  </p>
                </div>
                <div>
                  <b>What changes the price</b>
                  <p>
                    A fifth bedroom, the spa, the extended terrace with a pool,
                    the sliding glass wall.
                  </p>
                </div>
                <div>
                  <b>How the deal works</b>
                  <p>
                    A direct contract with the developer, escrow accounts,
                    title registration after handover.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ TRUST ══ */}
      <section className="sec" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="amen">
            <div>
              <b>Nine homes delivered</b>
              <p>
                No muddy building site here: nine residences are finished and
                lived in.
              </p>
            </div>
            <div>
              <b>Escrow accounts</b>
              <p>
                Your money stays in the bank until the acceptance act is signed —
                not with the developer.
              </p>
            </div>
            <div>
              <b>5-year warranty</b>
              <p>
                On structure and engineering, with a service crew that comes out
                to you.
              </p>
            </div>
            <div>
              <b>A viewing with no strings</b>
              <p>
                You come, walk through a finished house, and leave. No contracts
                on the spot.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ══ CTA BAND ══ */}
      <section className="sec" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="band">
            <h2>Come and walk through the house</h2>
            <a className="btn" href="#zayavka">
              Book a viewing
            </a>
          </div>
        </div>
      </section>

      {/* ══ LEAD CAPTURE FORM ══ */}
      <section className="sec" id="zayavka">
        <div className="wrap">
          <div className="split">
            <div>
              <p className="eyebrow">Viewing</p>
              <h2>
                Leave your number — we’ll show you around on a day that suits
              </h2>
              <p className="lede" style={{ marginTop: "20px" }}>
                A viewing takes about an hour: the finished house, the plot, the
                pier and the drive to the city.
              </p>
            </div>
            <div>
              <form className="form" id="leadForm" noValidate>
                <div className="field">
                  <label htmlFor="fname">Your name</label>
                  <input
                    id="fname"
                    name="name"
                    type="text"
                    required
                    autoComplete="name"
                    placeholder="Name"
                  />
                  <span className="err" id="err-name"></span>
                </div>
                <div className="field">
                  <label htmlFor="fphone">Phone</label>
                  <input
                    id="fphone"
                    name="phone"
                    type="tel"
                    required
                    autoComplete="tel"
                    placeholder="+1 555 000-0000"
                    inputMode="tel"
                  />
                  <span className="err" id="err-phone"></span>
                </div>
                <div className="field">
                  <label htmlFor="fwhen">When would suit you</label>
                  <input
                    id="fwhen"
                    name="when"
                    type="text"
                    placeholder="For example: Saturday afternoon"
                  />
                  <span className="err"></span>
                </div>
                <div className="hp" aria-hidden="true">
                  <label htmlFor="fhp">Leave this field empty</label>
                  <input
                    id="fhp"
                    name="hp_website"
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                  />
                </div>
                <button className="btn" type="submit" id="formSubmit">
                  Book a viewing
                </button>
                <p className="muted" style={{ margin: 0 }}>
                  We call back during business hours. No mailing lists, and your
                  data never goes to third parties.
                </p>
              </form>
              <div className="ok" id="formOk" hidden role="status">
                <h3>Booked</h3>
                <p style={{ marginTop: "10px", color: "var(--ink-2)" }} id="okText"></p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ FOOTER ══ */}
      <footer className="site">
        <div className="wrap">
          <div className="split" style={{ alignItems: "start" }}>
            <div>
              <p
                style={{
                  font: "700 20px/1.2 var(--d)",
                  letterSpacing: "-.01em",
                  color: "#f2efe9",
                  marginBottom: "14px",
                }}
              >
                LAKE HOUSE · AIST Village
              </p>
              <p style={{ fontSize: "15px" }}>
                A village of twelve two-level residences on a lakeshore in a pine
                forest.
              </p>
            </div>
            <div>
              <p style={{ fontSize: "15px" }}>
                <a href="#zayavka">Book a viewing</a>
                <br />
                <a href="#studio">Configure your home in 3D</a>
                <br />
                <a href="#plan">See the floor plan</a>
              </p>
            </div>
          </div>
          <p className="disclaimer">
            “AIST Village” and “LAKE HOUSE” are a fictional design concept,
            created to demonstrate what generative imagery and real-time 3D can
            do on the web. No such village exists. The images of the house and
            its interiors are AI-generated; the 3D model is an approximate
            reconstruction from a single frame, not a survey of a built house.
            Prices, floor areas, dates and availability are given as an example
            and do not constitute an offer.
          </p>
          <p className="disclaimer" style={{ marginTop: "14px" }}>
            Made by AIST Lab ·{" "}
            <a href="https://aistlab.online/" target="_blank" rel="noopener">
              aistlab.online
            </a>
          </p>
        </div>
      </footer>
    </>
  );
}
