/* eslint-disable @next/next/no-img-element */
import AmbientSoundscape from "@/components/audio/AmbientSoundscape";
import SunStudySimulator from "@/components/lighting/SunStudySimulator";
import VicinityRadarMap from "@/components/map/VicinityRadarMap";
import FloorplanDollhouse from "@/components/floorplan/FloorplanDollhouse";
import CarbonEnergyTracker from "@/components/sustainability/CarbonEnergyTracker";
import VipConciergeBooking from "@/components/concierge/VipConciergeBooking";
import BrandLogo from "@/components/ui/BrandLogo";

export default function Home() {
  return (
    <>
      <a className="btn skip" href="#zayavka">
        Skip to the enquiry form
      </a>

      {/* Floating Liquid-Glass Navigation Bar */}
      <nav className="nav" aria-label="Primary">
        <div className="nav__in">
          <a href="#hero" className="nav__brand">
            <BrandLogo size={26} />
            <span className="nav__brand-title">
              KAIROS <span className="nav__brand-sub">· Lakeside Sanctuary</span>
            </span>
          </a>
          <div className="nav__links">
            <a href="#hero">Sanctuary</a>
            <a href="#studio">3D Pavilion</a>
            <a href="#sustainability">Ecology</a>
            <a href="#radar">Vicinity</a>
            <a href="#plan">Blueprint</a>
            <a href="#cena">Acquisition</a>
          </div>
          <AmbientSoundscape />
          <a className="btn nav__cta" href="#zayavka">
            <span className="btn-l">Schedule Tour</span>
            <span className="btn-s">Tour</span>
          </a>
        </div>
      </nav>

      {/* ══ HERO SECTION ══ */}
      <header className="hero" id="hero" data-solar-phase="golden">
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

          {/* Interactive Daylight & Solar Study Control */}
          <SunStudySimulator />

          <div className="hero__copy">
            <div className="wrap">
              <p className="eyebrow" style={{ color: "rgba(251,249,245,.82)", letterSpacing: "0.22em", textTransform: "uppercase" }}>
                Nordic Archipelago · Old-Growth Pine Sanctuary · 8 Residences
              </p>
              <h1>
                Architecture carved
                <br />
                from silence &amp; light
              </h1>
              <div className="hero__row">
                <div className="hero__facts">
                  <div>
                    <b>from $1.25M</b>turnkey Nordic CLT
                  </div>
                  <div>
                    <b>420 m²</b>dual cantilever pavilions
                  </div>
                  <div>
                    <b>4–5 suites</b>with private timber sauna
                  </div>
                  <div>
                    <b>35 minutes</b>to capital heliport &amp; port
                  </div>
                </div>
                <a className="btn" href="#zayavka">
                  Schedule Private Viewing
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
                  <span className="hint__t">explore the 3D sanctuary</span>
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
            The Biophilic Philosophy
          </p>
          <div className="value__grid">
            <div className="value__i">
              <b>Untouched Nordic Waterline</b>
              <p>
                A 120-meter private shoreline and cedar pier with deep-water
                anchorage. Swim, kayak, or moor your craft directly from your
                doorstep — complete seclusion with zero neighboring sightlines.
              </p>
            </div>
            <div className="value__i">
              <b>Cantilevered Over Mirror-Still Water</b>
              <p>
                Two monolithic Shou Sugi Ban pavilions hover on concealed granite
                pylons. The lower deck extends over the lake, where a thin infinity
                sheet of clear water spills silently back into the lake.
              </p>
            </div>
            <div className="value__i">
              <b>Autonomous Circadian &amp; Geothermal Living</b>
              <p>
                Underfloor geothermal heating, 12kW integrated solar glass, and
                flush acoustic plaster walls that play music without visible
                speakers. Ambient light follows the natural Nordic solar rhythm.
              </p>
            </div>
            <div className="value__i">
              <b>85% Preserved Old-Growth Forest</b>
              <p>
                The architecture submits to the landscape: horizontal volumes
                rest beneath ancient scots pine crowns, with mossy bedrock and
                wild bilberry undergrowth preserved around every residence.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ══ ARCHITECTURE / BENTO ══ */}
      <section className="sec">
        <div className="wrap">
          <p className="eyebrow">Architectural Volumes</p>
          <h2>Monolithic serenity from every vantage</h2>
          <div className="bento" style={{ marginTop: "38px" }}>
            <figure className="b-w">
              <img
                src="/assets/img/arch_front.220dc657.webp"
                alt="KAIROS villa from the water: two offset volumes of charred timber and glass on piers, water sliding off the deck edge"
                loading="lazy"
                width={1920}
                height={1080}
              />
              <figcaption>
                <b>Over the Water</b>The lower Shou Sugi Ban pavilion hovers
                on concealed granite pylons; an infinity sheet of mirror water
                cascades off the deck.
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
                <b>The Dual Cantilever</b>The upper timber volume shifts along
                the horizontal axis, providing dual cantilevered shelter and
                dynamic sun-shading.
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
                <b>Pines &amp; Topography</b>Viewed from the old-growth pine
                ridge, the low-slung roof planes vanish beneath the canopy,
                preserving the natural skyline.
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
                <b>Seamless Lake Continuation</b>A 12-meter motorized low-iron
                glass wall glides into hidden wall pockets, dissolving the
                threshold between great room and water.
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
                <b>Private Cedar Raft &amp; Pier</b>Crystal-clear Nordic swimming
                waters thirty paces from the kitchen island.
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
                <b>Waterfront Stone Spa</b>A sunken thermal bath in flamed granite
                with frameless glass overlooking the morning lake mist.
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
                <b>Twilight Reflection</b>Hand-waxed smoked oak interiors glow
                through the panoramic glass, mirrored in the still water.
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
              <span>m² across two levels</span>
            </div>
            <div>
              <b>4–5</b>
              <span>suites with private timber saunas</span>
            </div>
            <div>
              <b>3,800</b>
              <span>m² plot, 85% old-growth forest</span>
            </div>
            <div>
              <b>35</b>
              <span>minutes to capital heliport</span>
            </div>
            <div>
              <b>3 / 8</b>
              <span>residences available</span>
            </div>
          </div>
        </div>
      </section>

      {/* ══ LIVE 3D + CONFIGURATOR ══ */}
      <section className="sec" id="studio">
        <div className="wrap">
          <p className="eyebrow">Real-Time 3D Engine · Drag to Orbit</p>
          <h2>Walk through the pavilions and personalize your residence</h2>
          <p className="lede" style={{ margin: "20px 0 30px" }}>
            Real-time spatial geometry. Orbit 360° around the cantilevered exterior
            or step inside into the double-height great room, kitchen gallery, and
            upper bedroom suites. Select bespoke timber finishes, suite counts, and
            spa configurations with immediate pricing and specification updates.
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

      {/* ══ SUSTAINABILITY & CARBON PERFORMANCE ══ */}
      <section className="sec" id="sustainability">
        <div className="wrap">
          <CarbonEnergyTracker />
        </div>
      </section>

      {/* ══ SURROUNDINGS ══ */}
      <section className="sec" id="okruzhenie">
        <div className="wrap">
          <p className="eyebrow">Ecosystem &amp; Silence</p>
          <h2>Zero ambient noise. Only wind, water, and pine.</h2>
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
                <b>Protected Old-Growth Forest</b>Century-old Scots pines and
                mossy granite were preserved during construction — each pavilion
                was hand-sited between mature trees.
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
                <b>Organic Stone Approach</b>Curving pathways paved in local
                quarried schist, illuminated by low-level bronze bollards.
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
                <b>Cantilevered Water Terrace</b>Private sunset dining poised
                above the lake with a mirror-infinity waterline.
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
                <b>Double-Height Nordic Glazing</b>Floating oak staircase
                adjacent to two storeys of ultra-clear low-iron acoustic glass.
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      {/* ══ ROOMS GALLERY ══ */}
      <section className="sec">
        <div className="wrap">
          <p className="eyebrow">Curated Living Spaces</p>
          <h2>Every room oriented toward water and light</h2>
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
                <b>The Monolithic Kitchen</b>A 4.2-meter island carved from
                flamed dark quartzite, integrated Gaggenau appliances, and pine
                panoramas behind frameless glass.
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
                <b>Master Penthouse Suite</b>Awaken elevated above the pine canopy
                looking across the lake; custom floating oak platform bed and
                concealed dressing room.
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
                <b>Hydrotherapy &amp; Stone Bath</b>Honed basalt soaking tub,
                private timber sauna, and rain shower with direct glass outlook to
                the waterline.
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
                <b>The Great Pavilion</b>A suspended hearth of blackened steel,
                low-profile Italian modular seating, and continuous oak planes
                flowing from interior to outdoor terrace.
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      {/* ══ FLOOR PLAN ══ */}
      <section className="sec" id="plan">
        <div className="wrap">
          <p className="eyebrow">Spatial Blueprint</p>
          <h2>Two levels conceived for quiet retreat &amp; entertaining</h2>
          <p className="lede" style={{ maxWidth: "72ch", marginTop: "20px" }}>
            Lower Level — The arrival gallery, monolithic island kitchen and dining
            room directly poised over the water, double-height great room, and
            cantilevered lake terrace. Upper Level — The master penthouse suite,
            private timber sauna, guest suites behind slatted timber louvres, and
            an open contemplation gallery.
          </p>

          {/* 3D Isometric Dollhouse Spatial Cutaway */}
          <FloorplanDollhouse />

          <div style={{ marginTop: "56px", marginBottom: "20px" }}>
            <h3 style={{ fontSize: "20px", fontFamily: "var(--d)", color: "var(--ink)" }}>
              Technical Architectural CAD Drafting &amp; Room Schedule
            </h3>
            <p className="muted" style={{ margin: "6px 0 0" }}>
              Explore certified millimeter-accurate structural layouts and room dimensions.
            </p>
          </div>

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
          <p className="eyebrow">Autonomous Engineering</p>
          <h2>Technology that dissolves into the architecture</h2>
          <div className="amen" style={{ marginTop: "38px" }}>
            <div>
              <b>Chameleon electrochromic glass</b>
              <p>
                Tints dynamically against solar gain and glare while maintaining
                unobstructed views. Complete thermal envelope with zero curtains.
              </p>
            </div>
            <div>
              <b>Circadian solar tracking</b>
              <p>
                Concealed warm illumination follows the natural Nordic sunlight
                curve — neutral clarity at noon, warm amber at twilight.
              </p>
            </div>
            <div>
              <b>Invisible acoustic surfaces</b>
              <p>
                Acoustic transducers plastered flush into clay walls — pristine
                spatial sound emerges from blank architectural planes.
              </p>
            </div>
            <div>
              <b>24/7 Biometric perimeter</b>
              <p>
                Concealed sensor mesh blended seamlessly into pine terrain and
                granite boulder landscaping.
              </p>
            </div>
            <div>
              <b>Autonomous geothermal microgrid</b>
              <p>
                Deep geothermal well, closed-loop water treatment, and Tesla
                Powerwall battery reserves for 100% off-grid resilience.
              </p>
            </div>
            <div>
              <b>Radiant timber heating</b>
              <p>
                Evenly distributed underfloor geothermal heat across all 420 m²,
                including cantilevered exterior deck thresholds.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ══ LOCATION & INTERACTIVE RADAR ══ */}
      <section className="sec" id="radar">
        <div className="wrap">
          <div className="split">
            <figure style={{ margin: 0 }}>
              <img
                src="/assets/img/arch_front.220dc657.webp"
                alt="KAIROS villa from the water: two storeys of dark timber and glass, water spilling off the deck edge"
                loading="lazy"
                width={1920}
                height={1080}
                style={{ borderRadius: "var(--r)" }}
              />
            </figure>
            <div>
              <p className="eyebrow">Connectivity &amp; Seclusion</p>
              <h2>Thirty-five minutes — an entirely different rhythm</h2>
              <p className="lede" style={{ marginTop: "20px" }}>
                The sanctuary sits on a secluded archipelago shoreline surrounded
                by old-growth Scots pine. The capital business district is 35
                minutes away along a scenic direct corridor; private aviation and
                marine transfers are 12 minutes. Complete tranquility without
                isolation.
              </p>
              <div
                className="amen"
                style={{ marginTop: "30px", gridTemplateColumns: "1fr 1fr" }}
              >
                <div>
                  <b>35 min</b>
                  <p>to business district</p>
                </div>
                <div>
                  <b>12 min</b>
                  <p>to private heliport &amp; aviation</p>
                </div>
                <div>
                  <b>0 m</b>
                  <p>to your deep-water cedar pier</p>
                </div>
                <div>
                  <b>24/7</b>
                  <p>biometric privacy perimeter</p>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Topographic Radar Map */}
          <VicinityRadarMap />
        </div>
      </section>

      {/* ══ REVIEWS / TESTIMONIALS ══ */}
      <section className="sec">
        <div className="wrap">
          <p className="eyebrow">Resident Perspectives</p>
          <h2>Five residences occupied, three remaining</h2>
          <div className="quotes" style={{ marginTop: "38px" }}>
            <div className="quote">
              <p>
                “We arrived for our initial walkthrough in late autumn. As the
                motorized glass wall slid back into the timber pocket, revealing
                the mist on the lake, we knew immediately this was our home.”
              </p>
              <footer>Residence No. 2, resident since spring</footer>
            </div>
            <div className="quote">
              <p>
                “The absolute acoustic silence is extraordinary. You hear only
                the wind through the pines and water lapping against the stone
                pylons. Yet my commute to the office is under forty minutes.”
              </p>
              <footer>Residence No. 5</footer>
            </div>
            <div className="quote">
              <p>
                “Morning espresso on the cantilever deck suspended over the lake;
                sunset from the timber sauna over the pine crowns. Each pavilion
                lives in complete harmony with the seasons.”
              </p>
              <footer>Residence No. 8</footer>
            </div>
          </div>
        </div>
      </section>

      {/* ══ PRICE + SCARCITY BAR ══ */}
      <section className="sec" id="cena">
        <div className="wrap">
          <div className="split">
            <div>
              <p className="eyebrow">Acquisition &amp; Pricing</p>
              <h2>From $1.25M turnkey investment</h2>
              <p className="lede" style={{ marginTop: "20px" }}>
                The turnkey specification includes 420 m² across two pavilions,
                four suites, complete geothermal engineering, native landscaping,
                and private waterfront pier ownership. Select finishes, spa suites,
                and infinity pool options in the 3D studio above to generate your
                personalized acquisition brief.
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
              </div>
              <p className="muted">
                3 of 8 residences remain available. Two waterfront positions.
              </p>
              <a className="btn" href="#zayavka" style={{ marginTop: "26px" }}>
                Schedule Private Viewing
              </a>
            </div>
            <div>
              <div className="amen" style={{ gridTemplateColumns: "1fr" }}>
                <div>
                  <b>Turnkey Base Inclusions</b>
                  <p>
                    420 m², 4 suites, double-height great room, cantilevered
                    waterfront terrace, geothermal HVAC, private cedar pier, and
                    turnkey landscaping.
                  </p>
                </div>
                <div>
                  <b>Custom Architecture Upgrades</b>
                  <p>
                    Fifth penthouse suite, bespoke stone hydrotherapy spa,
                    extended infinity plunge pool, and motorized sliding glass wall.
                  </p>
                </div>
                <div>
                  <b>Security &amp; Conveyance</b>
                  <p>
                    Direct contract with the master architect-developer, escrow
                    account protection, and freehold title registration upon completion.
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
              <b>Five homes delivered</b>
              <p>
                Five residences are completed and inhabited, maintaining a quiet,
                established sanctuary.
              </p>
            </div>
            <div>
              <b>Escrow custody</b>
              <p>
                Capital remains safely protected in bank escrow until final
                architectural sign-off and key handover.
              </p>
            </div>
            <div>
              <b>10-year warranty</b>
              <p>
                Comprehensive 10-year structural and building envelope guarantee
                supported by a dedicated estate maintenance team.
              </p>
            </div>
            <div>
              <b>Private viewing</b>
              <p>
                Experience a completed residence at your leisure with complete
                privacy and zero pressure.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ══ CTA BAND ══ */}
      <section className="sec" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="band">
            <h2>Experience the sanctuary in person</h2>
            <a className="btn" href="#zayavka">
              Schedule Private Viewing
            </a>
          </div>
        </div>
      </section>

      {/* ══ LEAD CAPTURE FORM ══ */}
      <section className="sec" id="zayavka">
        <div className="wrap">
          <div className="split">
            <div>
              <p className="eyebrow">Private Concierge</p>
              <h2>
                Schedule your private tour or spatial walkthrough
              </h2>
              <p className="lede" style={{ marginTop: "20px" }}>
                A private viewing includes access to the finished residence,
                grounds, waterfront pier, and complimentary luxury transfer from
                the capital or regional private airport.
              </p>
            </div>
            <div>
              <VipConciergeBooking />
            </div>
          </div>
        </div>
      </section>

      {/* ══ FOOTER ══ */}
      <footer className="site">
        <div className="wrap">
          <div className="split" style={{ alignItems: "start" }}>
            <div>
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "12px",
                  marginBottom: "14px",
                }}
              >
                <BrandLogo size={36} />
                <span
                  style={{
                    font: "700 22px/1.2 var(--d)",
                    letterSpacing: "-.01em",
                    color: "#f2efe9",
                  }}
                >
                  KAIROS · Lakeside Sanctuary
                </span>
              </div>
              <p style={{ fontSize: "15px" }}>
                An exclusive enclave of eight sustainable residences set along an
                old-growth pine archipelago.
              </p>
            </div>
            <div>
              <p style={{ fontSize: "15px" }}>
                <a href="#zayavka">Schedule a viewing</a>
                <br />
                <a href="#studio">Configure residence in 3D</a>
                <br />
                <a href="#plan">View spatial blueprint</a>
              </p>
            </div>
          </div>
          <p className="disclaimer">
            “KAIROS · Lakeside Sanctuary” is an architectural showcase of
            sustainable Nordic design, biophilic engineering, and real-time 3D
            spatial graphics. Renderings and interactive configurator displays are
            concept representations.
          </p>
          <p className="disclaimer" style={{ marginTop: "14px" }}>
            Conceived &amp; Engineered by Antigravity Studio.
          </p>
        </div>
      </footer>
    </>
  );
}
