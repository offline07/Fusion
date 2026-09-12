export type Track = "foundations" | "printing" | "cnc" | "capstone";

export type LessonKind = "video" | "lab" | "project";

export interface Video {
  youtubeId: string;
  title: string;
  author: string;
  minutes: number;
}

export interface QuizQuestion {
  question: string;
  options: string[];
  answer: number;
  explanation: string;
}

export interface Resource {
  label: string;
  url: string;
}

export interface Lesson {
  slug: string;
  title: string;
  kind: LessonKind;
  summary: string;
  minutes: number;
  video?: Video;
  alsoWatch?: Video[];
  objectives: string[];
  steps: string[];
  shopNotes?: string[];
  quiz?: QuizQuestion[];
  resources?: Resource[];
  deliverable?: string;
}

export interface ModuleProject {
  title: string;
  description: string;
  requirements: string[];
}

export interface Module {
  slug: string;
  number: number;
  title: string;
  tagline: string;
  description: string;
  track: Track;
  lessons: Lesson[];
  project: ModuleProject;
}

export const TRACK_META: Record<
  Track,
  { label: string; description: string; className: string }
> = {
  foundations: {
    label: "Foundations",
    description: "Interface, sketching, and parametric modeling habits.",
    className: "bg-stone-200 text-stone-800 dark:bg-stone-800 dark:text-stone-100",
  },
  printing: {
    label: "3D Printing",
    description: "Design for FDM, tolerances, and export to your slicer.",
    className: "bg-sky-100 text-sky-900 dark:bg-sky-900/50 dark:text-sky-100",
  },
  cnc: {
    label: "CNC Woodworking",
    description: "Manufacture workspace, 2D toolpaths, V-carving, and 3D relief.",
    className: "bg-amber-100 text-amber-900 dark:bg-amber-900/50 dark:text-amber-100",
  },
  capstone: {
    label: "Capstone",
    description: "A hybrid project that combines CNC joinery and printed hardware.",
    className: "bg-emerald-100 text-emerald-900 dark:bg-emerald-900/50 dark:text-emerald-100",
  },
};

export const COURSE = {
  title: "Fusion 360 for the Workshop",
  subtitle:
    "A hands-on course for woodworkers and makers: learn Fusion 360 by designing real parts, then cutting them on a CNC router and printing them on an FDM printer.",
  audience:
    "Built for hobbyist woodworkers with a desktop CNC (Shapeoko, X-Carve, Onefinity, LongMill, or similar) and an FDM printer. No prior CAD experience required.",
  outcomes: [
    "Model fully constrained, parametric parts you can resize in seconds",
    "Design printable parts with the right clearances, overhangs, and wall thickness",
    "Program 2D pocket, contour, V-carve, and 3D relief toolpaths for wood",
    "Post G-code your machine actually runs, and simulate before you cut",
    "Ship a finished keepsake box with CNC joinery and printed hinges",
  ],
};

export const MODULES: Module[] = [
  {
    slug: "orientation",
    number: 1,
    title: "Orientation and Your First Model",
    tagline: "Set up Fusion, learn to move around, and model a part on day one.",
    description:
      "Fusion 360 feels overwhelming the first time you open it. This module gets you comfortable with the interface, teaches the sketch rules that prevent 90% of beginner problems, and has you model your first real object before you finish.",
    track: "foundations",
    lessons: [
      {
        slug: "setup-and-interface",
        title: "Install Fusion and learn the interface",
        kind: "video",
        summary:
          "Get the free Personal Use license, set your units, and learn the nine parts of the interface you will touch every session.",
        minutes: 35,
        video: {
          youtubeId: "FmMNIGVpCng",
          title: "Navigate the Autodesk Fusion Interface Like a Pro!",
          author: "Autodesk Fusion",
          minutes: 14,
        },
        objectives: [
          "Install Fusion with a Personal Use (hobbyist) license",
          "Identify the Data Panel, Toolbar, Browser, Timeline, ViewCube, and Navigation Bar",
          "Orbit, pan, and zoom with the mouse without touching the toolbar",
          "Set default units to match how you measure in your shop",
        ],
        steps: [
          "Download Fusion from autodesk.com and activate the Personal Use license (free for hobbyists; it includes the Manufacture workspace you need for CNC).",
          "Open Preferences (click your name, top right) > General > Design. Set Default Units to millimeters or inches to match how you measure stock. This course gives both.",
          "In Preferences > General, set Pan/Zoom/Orbit shortcuts to the preset you prefer. Fusion default: middle-mouse drag pans, Shift + middle-mouse orbits, scroll zooms.",
          "Open the Data Panel and create a Project called 'Fusion Workshop Course'. Every file you make in this course lives here.",
          "Create a New Design, then practice: orbit around the origin, click each face of the ViewCube, press the Home icon, and use the Fit command (double-click the middle mouse button).",
          "Press S to open the Tool Search box. Type 'extrude', then 'parameters', then 'measure'. This is the fastest way to find any command.",
          "Right-click on empty canvas to see the Marking Menu. Note that Repeat Last Command sits at the top.",
        ],
        shopNotes: [
          "Woodworkers who think in inches: it is fine to work in inches. Just be consistent inside a file, and remember most 3D printing slicers expect millimeters (3MF export carries units; STL does not).",
          "Turn on 'Capture Design History' (right-click the top component in the Browser) if it is ever off. The Timeline is what makes designs editable later.",
        ],
        quiz: [
          {
            question: "Where do you change the default units for new designs?",
            options: [
              "The Data Panel",
              "Preferences > General > Design",
              "The Timeline settings gear",
              "Document Settings in the Browser only",
            ],
            answer: 1,
            explanation:
              "Preferences sets the default for new designs. Document Settings in the Browser changes the units of the current design only.",
          },
          {
            question: "What does pressing S do in the Design workspace?",
            options: [
              "Starts a sketch",
              "Saves the file",
              "Opens Tool Search to find any command by name",
              "Toggles the sidebar",
            ],
            answer: 2,
            explanation:
              "S opens the Tool Search box. It is the fastest way to find commands, and you can pin favorites from there to the toolbar.",
          },
        ],
        resources: [
          {
            label: "Fusion Personal Use license",
            url: "https://www.autodesk.com/products/fusion-360/personal",
          },
          {
            label: "Autodesk: Navigate the Fusion interface (blog)",
            url: "https://www.autodesk.com/products/fusion-360/blog/autodesk-fusion-interface/",
          },
        ],
      },
      {
        slug: "first-model-toy-block",
        title: "Your first model: sketch, extrude, shell, fillet",
        kind: "video",
        summary:
          "Follow along to model a toy block using the four tools that build most parts, then modify it on your own.",
        minutes: 45,
        video: {
          youtubeId: "4G2E_DqQteM",
          title: "Day 1 of Learn Autodesk Fusion in 30 Days (2026 Edition)",
          author: "Product Design Online",
          minutes: 13,
        },
        alsoWatch: [
          {
            youtubeId: "d3qGQ2utl2A",
            title: "Day 1 (2023 Edition) - same project, previous interface",
            author: "Product Design Online",
            minutes: 13,
          },
        ],
        objectives: [
          "Create a sketch on a plane and dimension it",
          "Extrude a profile into a body and use Join, Cut, and New Body",
          "Hollow a body with Shell and round edges with Fillet",
          "Use Rectangular Pattern to repeat features",
        ],
        steps: [
          "Follow the video and build the toy block exactly as shown. Save it as 'M1-02 Toy Block'.",
          "Open the Timeline and double-click the first sketch. Change the block from 2 x 4 studs to 2 x 2 by editing the pattern count. Watch everything downstream update.",
          "Change the wall thickness in the Shell feature from the video's value to 1.6 mm. This is two perimeters on a 0.4 mm nozzle, a good default wall for prints.",
          "Add a 0.5 mm chamfer to the bottom outside edge of the block. On a print this fights 'elephant foot' on the first layer.",
          "Hover over each feature in the Timeline and read the tooltip. You should be able to name what each one did.",
        ],
        shopNotes: [
          "Extrude, Fillet, Chamfer, and Shell will do 80% of your woodworking and printing work. Learn the hotkeys now: E, F, and Q for Press/Pull.",
          "Keep sketches simple and put roundovers in as Fillet features, not sketch fillets. Model fillets are easier to change and easier to suppress for CAM.",
        ],
        quiz: [
          {
            question:
              "You want a printed part with walls exactly two perimeters thick on a 0.4 mm nozzle. Which Shell thickness is closest?",
            options: ["0.4 mm", "0.8 mm", "1.2 mm", "2.0 mm"],
            answer: 1,
            explanation:
              "Two perimeters of a 0.4 mm nozzle is about 0.8 mm. Many makers round up to 1.2 mm (three perimeters) for strength; 1.6 mm gives four.",
          },
        ],
      },
      {
        slug: "fully-defined-sketches",
        title: "The one sketch rule: fully define everything",
        kind: "video",
        summary:
          "Why blue (under-constrained) sketch lines break models later, and how to lock your sketches with dimensions and constraints.",
        minutes: 30,
        video: {
          youtubeId: "zjmrCvQ85nI",
          title: "Don't break this Fusion 360 rule! (Day 16)",
          author: "Product Design Online",
          minutes: 8,
        },
        objectives: [
          "Recognize under-defined (blue) versus fully defined (black) sketch geometry",
          "Start sketches at the origin so they can be fully defined",
          "Use the drag test to find missing constraints",
          "State your design intent before you dimension",
        ],
        steps: [
          "Create a new design 'M1-03 Washer'. Sketch a 50 mm center rectangle on the origin with a 25 mm center circle. Do not add dimensions yet.",
          "Drag a corner. Notice everything moves. Now add a Midpoint or Coincident constraint to the origin, then dimensions. Drag again until nothing moves and all lines turn black.",
          "Open the sketch palette and check 'Show Constraints'. Count the constraint glyphs on your rectangle.",
          "Write a one-line 'design intent' in the sketch name, for example 'Washer - OD drives ID'. Then make the circle diameter an expression: type d = 50/2 in the dimension box.",
          "Delete one dimension on purpose and watch the geometry turn blue. Put it back.",
        ],
        shopNotes: [
          "A fully defined sketch is the difference between a model you can resize for a new board thickness and one you rebuild from scratch.",
          "Woodworkers: most shop parts are symmetric about a centerline. Center Rectangle plus the origin gives you that symmetry for free.",
        ],
        quiz: [
          {
            question: "A sketch line is blue. What does that mean?",
            options: [
              "It is selected",
              "It is a construction line",
              "It is under-defined and can still move",
              "It is fully defined",
            ],
            answer: 2,
            explanation:
              "Blue geometry still has degrees of freedom. Fully defined geometry turns black and the sketch shows a lock icon in the Browser.",
          },
        ],
      },
      {
        slug: "sketch-constraints",
        title: "All 12 sketch constraints, with a challenge",
        kind: "video",
        summary:
          "Every constraint explained once, then applied to a coaster profile you will actually cut later in the course.",
        minutes: 40,
        video: {
          youtubeId: "ddtjErtTgOo",
          title: "All 12 Fusion 360 Sketch Constraints (Day 17)",
          author: "Product Design Online",
          minutes: 10,
        },
        objectives: [
          "Apply Horizontal/Vertical, Coincident, Tangent, Equal, Parallel, Perpendicular, Midpoint, Concentric, Collinear, Symmetry, Fix, and Curvature",
          "Choose constraints before dimensions to keep sketches light",
          "Fully define a real part profile with the fewest dimensions",
        ],
        steps: [
          "Download the constraints demo file linked in the video and complete every constraint exercise.",
          "Create 'M1-04 Coaster'. Sketch a 100 mm square centered on the origin using Center Rectangle. Apply Equal to two adjacent sides so one dimension drives the square.",
          "Add 12 mm sketch fillets? No: leave the corners sharp in the sketch and plan to add a 12 mm Fillet feature after Extrude. Note why in the sketch name.",
          "Sketch a 6 mm wide inner border: use Offset (O) inward by 6 mm. Offset creates a constrained copy automatically.",
          "Extrude the whole coaster 9 mm (3/8 in stock is 9.5 mm; use 9.5 if that is what you have). Then Extrude-Cut the inner region 3 mm deep as a shallow pocket for a cork or printed insert.",
          "Add the 12 mm Fillet to the four vertical corners and a 1.5 mm chamfer to the top outside edge. Confirm the sketch shows a lock icon.",
        ],
        deliverable:
          "Coaster model: 100 mm square, 9-9.5 mm thick, 3 mm deep pocket inset 6 mm, 12 mm corner fillets, fully defined sketch.",
        quiz: [
          {
            question:
              "You sketched a rectangle and want both sides driven by one dimension. Which constraint do you apply first?",
            options: ["Fix", "Equal", "Collinear", "Curvature"],
            answer: 1,
            explanation:
              "Equal makes the two sides match so a single dimension controls the size. Applying the same dimension twice creates redundant edits later.",
          },
          {
            question: "Why keep corner radii out of the sketch and use the Fillet feature instead?",
            options: [
              "Sketch fillets cannot be measured",
              "Fillet features are easier to edit or suppress and keep the sketch simpler",
              "Fusion cannot extrude sketches with arcs",
              "There is no difference",
            ],
            answer: 1,
            explanation:
              "Model fillets keep the sketch fully defined with fewer entities and can be changed or suppressed independently, which matters when you set up CAM.",
          },
        ],
      },
    ],
    project: {
      title: "Module project: the shop coaster",
      description:
        "A 100 mm coaster with a shallow pocket. You will CNC cut this in Module 4 and print an insert for it in Module 3, so build it carefully now.",
      requirements: [
        "Sketch is fully defined (lock icon in Browser)",
        "Corner radii and top chamfer are model features, not sketch geometry",
        "Overall size is driven by a single dimension",
        "Saved in your course project as 'M1-04 Coaster'",
      ],
    },
  },
  {
    slug: "parametric-modeling",
    number: 2,
    title: "Parametric Modeling for the Shop",
    tagline: "Build models that resize themselves when your stock changes.",
    description:
      "Plywood is never exactly 3/4 inch and every bit you own has a different diameter. Parameters let you type the real numbers once and have the whole design follow. This module builds the habits that make Fusion worth learning for woodworking.",
    track: "foundations",
    lessons: [
      {
        slug: "user-parameters",
        title: "User parameters: the parametric box",
        kind: "video",
        summary:
          "Create named parameters, use them in sketches and features, and build a box you can resize with three numbers.",
        minutes: 45,
        video: {
          youtubeId: "DJULiA1aTtM",
          title: "Intro to User Parameters and Joints (Day 19)",
          author: "Product Design Online",
          minutes: 7,
        },
        objectives: [
          "Open Modify > Change Parameters and create user parameters with units",
          "Reference parameters inside dimensions and feature inputs",
          "Create parameters on the fly by typing name = value",
          "Test a parametric model by changing values and checking nothing breaks",
        ],
        steps: [
          "Follow the video to build the parametric box. Save as 'M2-01 Parametric Box'.",
          "Open Change Parameters and add these shop parameters you will reuse all course: stock_t = 18 mm (or 0.75 in), bit_d = 6.35 mm (1/4 in), clearance = 0.3 mm, kerf_comp = 0 mm.",
          "Edit the box so wall thickness references stock_t instead of a typed number.",
          "Change stock_t to 19.05 mm (a true 3/4 in), then to 12 mm. The box should update cleanly both times. If a feature fails, fix the sketch constraint that caused it.",
          "Add a comment to each parameter in the dialog. Future you will thank you.",
        ],
        shopNotes: [
          "Name parameters like variables: lowercase, underscores, units in the comment. Fusion parameter names cannot start with a number.",
          "Measure your actual sheet with calipers in three places and average it. Enter that, not the nominal thickness.",
        ],
        quiz: [
          {
            question:
              "You are in a dimension box and type 'lid_gap=0.4'. What happens?",
            options: [
              "Fusion errors because parameters must be created in the dialog first",
              "Fusion creates a parameter named lid_gap set to 0.4 and uses it for that dimension",
              "The dimension is set to 0 because of the equals sign",
              "Fusion renames the sketch",
            ],
            answer: 1,
            explanation:
              "Typing name=value in any input creates the parameter on the fly. It shows up under Favorites in the Change Parameters dialog.",
          },
        ],
      },
      {
        slug: "cutting-board-lab",
        title: "Lab: parametric cutting board with juice groove",
        kind: "lab",
        summary:
          "No video for this one. You will design an end-use woodworking part from a spec, using only the tools from the previous lessons.",
        minutes: 60,
        objectives: [
          "Model a board from a spec using parameters for length, width, thickness, and groove offset",
          "Create a groove path with Offset and model it with Sweep",
          "Add a finger-pull handle pocket and edge roundovers",
          "Prepare geometry that CAM can select cleanly later",
        ],
        steps: [
          "New design 'M2-02 Cutting Board'. Parameters: board_l = 400 mm, board_w = 280 mm, board_t = 32 mm, groove_inset = 25 mm, groove_d = 10 mm (a 3/8 in ball nose), corner_r = 20 mm.",
          "Sketch a Center Rectangle on the origin, board_l by board_w. Extrude board_t. Add corner_r fillets to the four vertical edges.",
          "Sketch on the top face: use Project (P) to bring in the outer edge, then Offset it inward by groove_inset. Convert the projected outer loop to construction. This inner loop is your groove centerline.",
          "Create a Sketch on a plane perpendicular to the groove path (use a Construction Plane Along Path at 0). Draw a circle of diameter groove_d centered on the path. Sweep it along the path as a Cut. Depth is set by placing the circle center groove_d/2 minus 4 mm above the top face so the groove is 4 mm deep.",
          "Add a finger pull: on one long edge, sketch a 90 x 25 mm slot shape on the bottom face, Extrude-Cut 12 mm, then apply a 6 mm fillet to the pocket floor edges.",
          "Round the top and bottom outside edges with a 6 mm fillet. Keep it as a separate feature named 'roundover' so you can suppress it in CAM.",
          "Change board_l to 300 and board_w to 200. Everything should regenerate. Set it back.",
        ],
        shopNotes: [
          "Model the groove with the same radius as the ball nose you own. Then in CAM a Trace toolpath following the centerline with a negative axial offset reproduces it exactly.",
          "Sweeping a circle is more work than an extruded slot but it gives you real geometry to simulate against, and it will show cusps if you pick the wrong bit.",
          "If you will machine this two-sided, add two 6 mm dowel holes outside the board outline in the stock for alignment pins. You will use them in Module 4.",
        ],
        deliverable:
          "Cutting board model driven by parameters with a swept juice groove, finger pull pocket, and a suppressible roundover feature.",
        resources: [
          {
            label: "Autodesk forum: Trace toolpath for juice grooves",
            url: "https://forums.autodesk.com/t5/fusion-manufacture-forum/cutting-quot-juice-grooves-quot-into-cutting-board/td-p/13252564",
          },
        ],
      },
      {
        slug: "modeling-toolkit",
        title: "Lab: the everyday modify toolkit",
        kind: "lab",
        summary:
          "Press/Pull, Offset Face, Combine, Split Body, Mirror, and patterns, practiced on shop parts you will keep using.",
        minutes: 45,
        objectives: [
          "Use Press/Pull (Q) to modify faces without editing sketches",
          "Use Combine to cut one body with another (the fastest way to make matching parts)",
          "Mirror and pattern bodies and features",
          "Use Split Body to turn one model into two machinable halves",
        ],
        steps: [
          "New design 'M2-03 Toolkit'. Model a 150 x 60 x 18 mm block. Use Press/Pull on the top face to make it 20 mm. Note the Timeline shows a Press/Pull feature, not a sketch edit.",
          "Model a 12 mm cylinder standing on the block. Use Combine > Cut with 'Keep Tools' checked to cut a socket into the block. Open Change Parameters and add clearance, then Offset Face the socket walls by clearance to loosen the fit.",
          "Sketch a 20 mm circle near one end and Extrude-Cut through. Use Rectangular Pattern on the feature (not the body) for 5 holes at 25 mm spacing. Change the spacing and count.",
          "Mirror the pattern across the block's centerline using the origin plane.",
          "Use Split Body with the XY origin plane to split the block into top and bottom halves. Rename the bodies 'Top' and 'Bottom'. This is how you prepare two-sided CNC work.",
          "Use Section Analysis (Inspect menu) to look inside your socket and confirm the clearance offset.",
        ],
        shopNotes: [
          "Combine + Offset Face is how you make a lid that fits a box, a tray that fits a drawer, and a pocket that fits an inlay. Learn it well.",
          "Patterns on features are lighter than patterns on bodies. Use Adjust compute mode unless Fusion gets slow.",
        ],
        quiz: [
          {
            question:
              "You cut a pocket using Combine with the insert body as the tool and forgot to check Keep Tools. What happened?",
            options: [
              "Nothing, Combine always keeps tools",
              "The insert body was consumed and no longer exists in the Browser",
              "The pocket is the wrong size",
              "Fusion created a new component",
            ],
            answer: 1,
            explanation:
              "Combine consumes the tool bodies by default. Check Keep Tools when you still need the insert, which you almost always do.",
          },
        ],
      },
    ],
    project: {
      title: "Module project: your parametric cutting board",
      description:
        "Finish the cutting board lab so it becomes a real CNC project in Module 4. Pick dimensions you actually want to make.",
      requirements: [
        "Every size is a user parameter with a comment",
        "Juice groove is a swept cut matching a ball nose you own",
        "Roundover is a separate, suppressible feature",
        "Model regenerates when length and width change by 100 mm",
      ],
    },
  },
  {
    slug: "3d-printing",
    number: 3,
    title: "Design for 3D Printing",
    tagline: "Parts that print the first time and fit the parts they were designed for.",
    description:
      "Printing turns Fusion from a drawing tool into a shop tool: jigs, stops, bit holders, inlays, and hardware for your woodworking projects. This module covers FDM design rules, dialing in your printer's tolerances, moving parts, and a clean export workflow.",
    track: "printing",
    lessons: [
      {
        slug: "design-for-fdm",
        title: "Design rules for FDM: overhangs, bridges, and orientation",
        kind: "video",
        summary:
          "How layers actually get laid down, and the modeling tricks (chamfers, teardrops, sacrificial layers) that remove supports.",
        minutes: 40,
        video: {
          youtubeId: "vRA776CtTw0",
          title: "Stronger 3D Prints and Less Supports: How to Design for 3D Printing",
          author: "JanTec Engineering",
          minutes: 12,
        },
        objectives: [
          "Apply the 45 degree overhang rule and know when bridging is acceptable",
          "Replace circular horizontal holes with teardrops",
          "Use one-layer sacrificial bridges to print counterbores without supports",
          "Choose print orientation for strength, not just for convenience",
        ],
        steps: [
          "New design 'M3-01 Overhang Test'. Model a 40 x 20 x 3 mm base with five 3 mm thick fins angled at 30, 45, 55, 65, and 75 degrees from vertical. Print it and note the steepest fin that printed cleanly. That is your overhang limit.",
          "Model a 20 mm cube with a horizontal 8 mm hole. Duplicate it, and on the copy change the hole sketch to a teardrop (circle plus two tangent lines meeting at 45 degrees on top). Print both and compare the top of each hole.",
          "Model an M5 counterbore from the bottom face with a 0.2 mm sacrificial layer between the bore and the through-hole. Print it and drill the layer out.",
          "Add a 0.4 mm 45 degree chamfer to every bottom edge on each test part before printing.",
        ],
        shopNotes: [
          "Layer lines are the grain of a print. Load them in compression, not in tension. A hook printed flat snaps; printed on its side it holds.",
          "Chamfers instead of fillets on downward-facing edges: a 45 degree chamfer prints clean, a fillet on the bottom becomes an unsupported overhang.",
        ],
        quiz: [
          {
            question: "Why does a teardrop-shaped horizontal hole print better than a round one?",
            options: [
              "It uses less filament",
              "Its top keeps the overhang at 45 degrees instead of approaching 90",
              "Slicers cannot process round holes",
              "It is stronger in all directions",
            ],
            answer: 1,
            explanation:
              "A circle's top approaches a horizontal overhang and droops. The teardrop keeps every layer within the 45 degree rule so the hole keeps its size.",
          },
        ],
      },
      {
        slug: "fit-and-tolerance",
        title: "Fit and tolerance: build a clearance gauge for your printer",
        kind: "video",
        summary:
          "Clearance, transition, and interference fits explained, then measured on your own machine with a gauge you model yourself.",
        minutes: 60,
        video: {
          youtubeId: "Re4tKegVfqs",
          title: "Beginner's Guide to Fit and Tolerance in Fusion 360",
          author: "Practical Alchemy",
          minutes: 18,
        },
        objectives: [
          "Define clearance, transition, and interference fits",
          "Model a parametric fit gauge with a pattern of stepped clearances",
          "Print, test, and record the clearance values for your printer",
          "Store those values as parameters you reuse in every future design",
        ],
        steps: [
          "New design 'M3-02 Fit Gauge'. Parameters: peg_d = 10 mm, gap_start = 0.1 mm, gap_step = 0.1 mm, count = 6.",
          "Model a 10 mm peg body and a bar with six 10 mm-plus-gap holes. Drive each hole with peg_d + gap_start + gap_step * n, where n is 0 to 5. Emboss the gap value next to each hole with the Text tool and a 0.6 mm extrude.",
          "Export both parts (see the export lesson if you get stuck) and print at your normal settings: 0.2 mm layers, 3 walls.",
          "Test the peg in each hole. Record: the tightest hole the peg presses into (interference), the first hole it slides into by hand (transition), and the first hole where it falls out (clearance).",
          "Open your Parametric Box from Module 2 and add three parameters: fit_press, fit_slide, fit_loose, with your measured numbers. Copy these into every new design.",
          "Print a second gauge oriented so the holes are horizontal. Note how the numbers change. Horizontal holes almost always need more clearance.",
        ],
        shopNotes: [
          "Typical starting points on a well-tuned 0.4 mm nozzle printer: press fit 0.1-0.15 mm, sliding fit 0.2-0.3 mm, free/loose 0.4-0.5 mm, print-in-place moving parts 0.4-0.6 mm. Yours will differ; that is the point of the gauge.",
          "Wood is not a print. When a printed part meets a CNC-cut pocket, add the CNC's tolerance too: most hobby routers hold about 0.1-0.2 mm.",
        ],
        deliverable:
          "A printed fit gauge and three recorded clearance parameters for your printer (press, slide, loose).",
        quiz: [
          {
            question:
              "A printed lid should snap onto a printed box and come off with fingers. Which fit are you aiming for?",
            options: ["Clearance", "Transition", "Interference", "None of these"],
            answer: 1,
            explanation:
              "A transition fit is snug: it holds without glue but can be separated. Interference needs force or heat; clearance falls off.",
          },
        ],
      },
      {
        slug: "print-in-place-hinge",
        title: "Moving parts: a print-in-place hinge",
        kind: "video",
        summary:
          "Design a hinge that prints assembled with no supports, using the clearances you measured in the last lesson.",
        minutes: 60,
        video: {
          youtubeId: "fYDJLdOV_zE",
          title: "Design 3D Printable Hinges (Day 20)",
          author: "Product Design Online",
          minutes: 10,
        },
        alsoWatch: [
          {
            youtubeId: "wFejArLliwg",
            title: "Fusion Print-in-Place Hinge Tutorial (No Supports)",
            author: "What Make Art",
            minutes: 9,
          },
          {
            youtubeId: "w1o48laHAos",
            title: "Print in Place Hinge with Parametric Pin",
            author: "What Make Art",
            minutes: 12,
          },
        ],
        objectives: [
          "Model a two-part hinge with a captured pin driven by a clearance parameter",
          "Use Offset Face to add clearance after the fact",
          "Use Section Analysis to prove there is no interference before printing",
          "Chamfer the pin and knuckles so the hinge prints without supports",
        ],
        steps: [
          "New design 'M3-03 Hinge'. Parameters: hinge_gap = your fit_loose value, pin_d = 4 mm, knuckle_len = 8 mm.",
          "Follow the main video to model the hinge. Then adapt: replace every typed clearance with hinge_gap.",
          "Run Inspect > Section Analysis through the pin axis and confirm a visible gap all the way around. If the gap is under 0.3 mm anywhere, increase hinge_gap.",
          "Chamfer the underside of every knuckle at 45 degrees so nothing overhangs more than 45 degrees when the hinge lies flat.",
          "Export both bodies as a single 3MF and print flat. Work the hinge back and forth while the part is still warm.",
          "If it is fused, raise hinge_gap by 0.1 mm and reprint. If it is sloppy, lower it. Record the final value as hinge_gap in your parameter list.",
        ],
        shopNotes: [
          "This hinge becomes the lid hinge on your capstone box. Size the leaves now so they can be screwed to 12 mm and 18 mm wood: two countersunk holes per leaf, 3.5 mm through, 7 mm countersink.",
          "Elephant foot on the first layer is what fuses most print-in-place hinges. The 0.4 mm chamfer on bottom edges is not optional here.",
        ],
        deliverable: "A working printed hinge with a recorded hinge_gap parameter.",
      },
      {
        slug: "export-to-slicer",
        title: "Export to your slicer: STL, 3MF, and mesh refinement",
        kind: "video",
        summary:
          "Every way to get a model out of Fusion, which format to choose, and how refinement settings affect curved parts.",
        minutes: 30,
        video: {
          youtubeId: "I3FC69CQAKA",
          title: "How to Export Your Autodesk Fusion Model for 3D Printing",
          author: "Autodesk Fusion",
          minutes: 6,
        },
        objectives: [
          "Export with Save As Mesh and with Tools > Make > 3D Print",
          "Choose between 3MF and binary STL",
          "Set refinement so cylinders do not show facets",
          "Send directly to Bambu Studio, PrusaSlicer, OrcaSlicer, or Cura",
        ],
        steps: [
          "Open your hinge. Right-click the top component > Save As Mesh. Export as 3MF, refinement High. Open it in your slicer and confirm the units and both bodies arrive.",
          "Export the same part as binary STL with refinement Low. Slice both and zoom in on the pin. Note the facets on the Low export.",
          "Open Tools > Make > 3D Print. Set your slicer as the print utility so future exports open the slicer directly.",
          "In your slicer, orient the coaster insert from Module 1 (a 3 mm disc that fits the pocket) and record layer height, wall count, and infill in the lesson notes.",
        ],
        shopNotes: [
          "Prefer 3MF. It carries units and multiple bodies with their positions. STL is unitless; if a slicer imports your part 25.4 times too small, that is why.",
          "Refinement High is fine for anything under 100 mm. For large flat parts, Medium keeps files small with no visible difference.",
        ],
        quiz: [
          {
            question: "Which export format carries units, color, and multiple bodies in one file?",
            options: ["STL (binary)", "STL (ASCII)", "3MF", "OBJ"],
            answer: 2,
            explanation:
              "3MF is an XML-based format that includes units and can package several bodies, which is why modern slicers prefer it.",
          },
        ],
        resources: [
          {
            label: "Autodesk help: 3D print a design (refinement settings)",
            url: "https://help.autodesk.com/cloudhelp/ENU/Fusion-Model/files/SLD-3D-PRINT.htm",
          },
        ],
      },
    ],
    project: {
      title: "Module project: router bit organizer",
      description:
        "A parametric holder for your CNC bits: 1/4 in and 1/8 in shanks, labeled, with a sliding fit you measured yourself. It also proves your tolerance numbers before the capstone.",
      requirements: [
        "Shank holes driven by shank diameter plus your fit_slide parameter",
        "Row count and spacing are parameters",
        "Embossed labels on the front face using the Text tool",
        "Bottom edges chamfered 0.4 mm; no supports required",
        "Exported as 3MF and printed",
      ],
    },
  },
  {
    slug: "cnc-fundamentals",
    number: 4,
    title: "CNC Fundamentals: The Manufacture Workspace",
    tagline: "From model to G-code your router runs: setups, tools, 2D toolpaths, tabs, and posts.",
    description:
      "This is the heart of the course for woodworkers. You will learn the five things every CAM job needs (setup, stock, tools, toolpaths, post), program the coaster and the cutting board, and carve a sign with a V-bit. Everything is simulated before it goes near the machine.",
    track: "cnc",
    lessons: [
      {
        slug: "cam-anatomy",
        title: "Anatomy of a CAM job",
        kind: "video",
        summary:
          "Setup, stock, work coordinate system, tool library, toolpaths, simulation, and post processing, explained end to end in one project.",
        minutes: 50,
        video: {
          youtubeId: "iqnvzxuXFTQ",
          title: "Fusion 360 CAM tutorial for CNC beginners",
          author: "Evan and Katelyn",
          minutes: 19,
        },
        alsoWatch: [
          {
            youtubeId: "VPMvnzmuTOw",
            title: "Fusion 360 Tutorial: CAM Basics",
            author: "Austin Shaner",
            minutes: 27,
          },
        ],
        objectives: [
          "Create a Setup with correct orientation and a stock box with margins",
          "Place the WCS origin where you will actually zero the machine",
          "Explain what a post processor does and why the wrong one crashes machines",
          "Read a simulation for gouges, collisions, and rapid moves through material",
        ],
        steps: [
          "Open your coaster. Switch to the Manufacture workspace. Create a Setup: Operation Type Milling, Z axis up, X along the long edge.",
          "Stock tab: Relative Size Box with 10 mm side offset and 0 mm top offset (you will surface later if needed). Set stock thickness to match a real board you have.",
          "Move the stock box point to the top-left-front corner of the stock. That is where you will zero X, Y, and Z at the machine. Write that down in the setup name: 'Coaster - zero top left front'.",
          "Create a 2D Adaptive Clearing on the pocket with a 1/4 in flat end mill from the sample library. Do not worry about feeds yet.",
          "Run Simulate with Stock and Toolpath both on. Scrub the timeline slowly and find where the tool enters the material.",
          "Right-click the setup > Post Process. Pick the GRBL post (or your controller's post). Post to a folder and open the .nc file in a text editor. Find the spindle speed, the first rapid, and the first feed move.",
        ],
        shopNotes: [
          "Your WCS origin in Fusion must match where you touch off at the machine. Most mismatches (bit plunging into the spoilboard, cutting in the wrong corner) come from this one decision.",
          "Posts to know: GRBL (Onefinity, LongMill, X-Carve, most hobby machines), Carbide 3D (Shapeoko with Carbide Motion), Masso (Onefinity Elite), Mach3/Mach4, LinuxCNC. The post determines the G-code dialect, not the machine model.",
        ],
        quiz: [
          {
            question: "What does the post processor do?",
            options: [
              "Simulates the toolpath",
              "Converts Fusion's toolpath into the G-code dialect your controller understands",
              "Sets the feeds and speeds",
              "Uploads the design to the cloud",
            ],
            answer: 1,
            explanation:
              "The post translates internal toolpath data into controller-specific G-code. Using the wrong post can produce commands your machine ignores or misreads.",
          },
          {
            question: "Where should the WCS origin be placed?",
            options: [
              "Always at the model origin",
              "Wherever Fusion defaults it",
              "At the exact point where you will zero X, Y, and Z on the machine",
              "At the center of the spoilboard",
            ],
            answer: 2,
            explanation:
              "The WCS must match your physical touch-off point. If they disagree, everything cuts offset from where you expect.",
          },
        ],
        resources: [
          {
            label: "Autodesk: How to set up Fusion with a GRBL post",
            url: "https://www.autodesk.com/products/fusion-360/blog/fusion-360-grbl-post/",
          },
        ],
      },
      {
        slug: "machine-tools-feeds",
        title: "Your machine, your post, your tool library",
        kind: "video",
        summary:
          "Set up a machine definition for your hobby CNC, choose the right post, and build a tool library with feeds and speeds for wood.",
        minutes: 60,
        video: {
          youtubeId: "UFb7F6GRojc",
          title: "Create a Custom Machine Configuration for Hobbyist CNC (Shapeoko, X-Carve, LongMill)",
          author: "Product Design Online",
          minutes: 12,
        },
        objectives: [
          "Create a local machine definition with your travel limits and post",
          "Build a tool library with the bits you own, measured with calipers",
          "Calculate feed rate from RPM, flutes, and chip load",
          "Set sensible default stepdown and stepover for hardwood, plywood, and MDF",
        ],
        steps: [
          "Manufacture > Machine Library > Local > add a machine. Enter your work area, max feed, and select your post processor in the Post Processor tab.",
          "Manage > Tool Library > Local > create these tools, measuring each with calipers: 1/4 in 2-flute downcut flat (T1), 1/8 in 2-flute upcut flat (T2), 1/8 in ball nose (T3), 60 degree V-bit (T4), 1/4 in ball nose (T5) if you have one. Enter shaft diameter, flute length, and overall length.",
          "In Cutting Data for T1, enter Spindle 18000 RPM and Feed per Tooth 0.002 in (0.05 mm). Fusion computes 72 in/min (1830 mm/min). Set plunge to half the feed and ramp to 60% of feed.",
          "Add a second preset for the same tool named 'Plywood/MDF' at 0.0025 in per tooth and one named 'Hardwood conservative' at 0.0015 in per tooth.",
          "Open the Reference page in this course, use the chip load calculator with your machine's RPM, and fill in the rest of your tools.",
          "Run a test cut: a 100 mm slot in scrap at your T1 hardwood preset, 3 mm stepdown. Listen. A steady tone is good; chatter means slow the feed or reduce stepdown; squealing and burning means feed faster.",
        ],
        shopNotes: [
          "Hobby routers are not rigid. Manufacturer chip loads are for industrial machines; start at half and work up. Chips should look like small flakes, not dust (too slow) or splinters (too fast).",
          "Downcut bits leave a clean top edge on plywood but pack chips in slots; use upcut for deep slots and downcut for through-cuts where the top face shows. Compression bits do both on through-cuts.",
          "Stepdown starting points for a 1/4 in bit on a hobby machine: 3-4 mm in hardwood, 6 mm in MDF or pine. Adaptive can go deeper because the radial engagement is small.",
        ],
        quiz: [
          {
            question:
              "A 2-flute 1/4 in bit at 18,000 RPM with a 0.002 in chip load should run at about what feed rate?",
            options: ["18 in/min", "36 in/min", "72 in/min", "144 in/min"],
            answer: 2,
            explanation:
              "Feed = RPM x flutes x chip load = 18,000 x 2 x 0.002 = 72 in/min (about 1830 mm/min).",
          },
        ],
        resources: [
          {
            label: "Autodesk tutorial: Cutting data, feeds and speeds",
            url: "https://www.autodesk.com/learn/ondemand/tutorial/cutting-data-feeds-and-speeds",
          },
          {
            label: "Sienci feeds and speeds tables for hobby CNC",
            url: "https://resources.sienci.com/view/cnc-feeds-speeds/",
          },
        ],
      },
      {
        slug: "pocket-contour-tabs",
        title: "2D Pocket, 2D Contour, and tabs: CAM the coaster",
        kind: "video",
        summary:
          "The two toolpaths that cut most flat woodworking parts, plus tabs, multiple depths, and stock-to-leave for a fitted pocket.",
        minutes: 60,
        video: {
          youtubeId: "VPMvnzmuTOw",
          title: "Fusion 360 Tutorial: CAM Basics (gift box)",
          author: "Austin Shaner",
          minutes: 27,
        },
        objectives: [
          "Program a 2D Pocket with multiple depths and a finishing pass",
          "Program a 2D Contour through-cut with tabs that do not land on corners",
          "Use negative stock-to-leave to open a pocket for a printed insert",
          "Order operations so the part is held until the last cut",
        ],
        steps: [
          "Open the coaster Setup from the CAM anatomy lesson. Delete the practice adaptive and create 2D Pocket: tool T1, select the pocket floor, Multiple Depths on, Max Roughing Stepdown 3 mm, Stock to Leave off.",
          "In Passes, set Stock to Leave to -0.15 mm radial (your fit_slide value, halved per side) so the printed 3 mm insert will drop in. Note that a negative value makes the pocket bigger.",
          "Create 2D Contour: tool T1, select the bottom outside edge of the coaster. Heights: bottom height = Stock Bottom, offset -0.3 mm so you cut slightly into the spoilboard tape. Multiple Depths, 4 mm stepdown.",
          "Enable Tabs: rectangular, 8 mm wide, 3 mm tall, 4 tabs per contour. Look at the preview; if a tab landed on a fillet, switch to manual tabs and click them onto the straight edges.",
          "Simulate the whole setup. Confirm: pocket first, contour second, and the tool never rapids below the top of stock.",
          "Post the setup as one file (single tool). Name it 'coaster-T1-quarter-downcut.nc'. Cut it. Remove tabs with a flush trim bit or chisel and sand.",
        ],
        shopNotes: [
          "Tabs for 18 mm plywood: 8-10 mm wide, 3 mm tall is plenty. For 6 mm stock use 6 x 1.5 mm. Too tall and you spend more time removing them than cutting the part.",
          "Cut through into the spoilboard by 0.2-0.5 mm, never zero. Plywood is not flat; zero leaves onion skin.",
          "Downcut bits push the part down and leave a crisp top edge, which is why T1 is a downcut for through-cuts.",
        ],
        deliverable: "A machined coaster with a pocket sized to accept your printed insert.",
        quiz: [
          {
            question: "In a 2D Pocket, a negative radial Stock to Leave does what?",
            options: [
              "Leaves material for a finishing pass",
              "Cuts the pocket larger than the model by that amount",
              "Cuts the pocket shallower",
              "Disables multiple depths",
            ],
            answer: 1,
            explanation:
              "Negative stock-to-leave removes extra material, enlarging the pocket. It is the standard way to add fit clearance in CAM without changing the model.",
          },
        ],
        resources: [
          {
            label: "Autodesk help: 2D Contour reference (tabs)",
            url: "https://help.autodesk.com/cloudhelp/ENU/Fusion-CAM/files/GUID75B6821B-DE26-4E3B-AF10-4A54131CD9E4.htm",
          },
        ],
      },
      {
        slug: "vcarve-signs",
        title: "Signs and lettering: V-carving with Engrave",
        kind: "video",
        summary:
          "Use a V-bit and the Engrave toolpath to carve text and line art, and combine it with a pocket for wide letters.",
        minutes: 50,
        video: {
          youtubeId: "nU2AYqytd0U",
          title: "Fusion 360: Engraving Text on Signs (CNC Router)",
          author: "Learn It!",
          minutes: 9,
        },
        objectives: [
          "Place and constrain text in a sketch and choose a font that carves well",
          "Program Engrave with a V-bit, max depth, and multiple depths",
          "Pocket wide letters first, then clean corners with Engrave",
          "Set a 60 degree versus 90 degree V-bit by letter size",
        ],
        steps: [
          "New design 'M4-04 Sign'. Model a 300 x 120 x 18 mm plaque with 15 mm corner fillets. Sketch text on the top face: your shop name, 40 mm tall, a serif or bold sans font. Explode is not required; Fusion can select sketch text directly.",
          "Manufacture: new Setup, zero top-left-front. Create Engrave: tool T4 (60 degree V), Geometry = the text sketch, Heights: bottom height = Top of stock offset -3 mm as a maximum depth.",
          "Passes: Multiple Depths on, 1.5 mm stepdown. Simulate. Zoom in on a letter with a sharp corner and confirm the tool lifts into the corner.",
          "For any letter stroke wider than the V-bit can reach at 3 mm depth (for a 60 degree bit that is about 3.5 mm wide), add a 2D Pocket with T2 (1/8 in) first, with Wall Taper Angle 30 degrees, then let Engrave finish.",
          "Add a decorative border: sketch an offset rectangle 10 mm inside the edge and Engrave it 1 mm deep.",
          "Post both tools as separate files, cut, then fill the letters with paint and sand the surface flush.",
        ],
        shopNotes: [
          "60 degree V-bits for lettering under 50 mm, 90 degree for big bold text. Sharper angles carve deeper for a given width; check the max depth so a 60 degree bit does not bury.",
          "Fusion's Engrave is not a true flat-bottom V-carve like Vectric. Pocket plus Engrave gets you 90% there for signs.",
          "V-bit tearout: score across the grain with a light 0.5 mm first pass, or run climb milling. Use a spoilboard-flat, dead-flat blank.",
        ],
        quiz: [
          {
            question: "Fusion's Engrave toolpath is designed for which tool type?",
            options: [
              "Flat end mill",
              "Ball nose",
              "Chamfer or engrave mill with a pointed tip",
              "Roundover bit",
            ],
            answer: 2,
            explanation:
              "Engrave drives a V-shaped chamfer tool between the selected contours and raises or lowers it to keep two points of contact, producing sharp corners.",
          },
        ],
        resources: [
          {
            label: "Autodesk help: Engrave toolpath reference",
            url: "https://help.autodesk.com/cloudhelp/ENU/Fusion-CAM/files/GUID-7111B68D-F0B0-464E-B9A8-09400F4650B9.htm",
          },
        ],
      },
    ],
    project: {
      title: "Module project: machine the cutting board",
      description:
        "Take the Module 2 cutting board through CAM: juice groove with Trace and a ball nose, finger pull pocket, roundover with a radius bit or ball nose, and a tabbed contour cutout.",
      requirements: [
        "Setup zeroed at a documented corner; stock matches your measured blank",
        "Juice groove programmed as Trace with sideways compensation Center and a negative axial offset equal to groove depth",
        "Finger pull as 2D Pocket with multiple depths",
        "Contour with tabs; simulation shows no rapids through stock",
        "One posted .nc file per tool, named with the tool",
        "Optional: two-sided setup using dowel pins for a bottom roundover",
      ],
    },
  },
  {
    slug: "3d-carving",
    number: 5,
    title: "3D Carving and Relief Work",
    tagline: "Dishes, trays, and sculpted reliefs with roughing and finishing passes.",
    description:
      "3D toolpaths are where a CNC router earns its keep: carved bowls, serving trays, topographic maps, and decorative reliefs. You will learn the rough-then-finish workflow, how stepover controls surface quality, how to sculpt organic shapes, and how to bring in mesh reliefs from the internet.",
    track: "cnc",
    lessons: [
      {
        slug: "rough-and-finish",
        title: "3D Adaptive roughing and Parallel finishing",
        kind: "video",
        summary:
          "Model a dished tray, hog out material with 3D Adaptive, then finish with a ball nose using rest machining.",
        minutes: 75,
        video: {
          youtubeId: "G3h4Oe2i3Xo",
          title: "Fusion 360 CNC 3D Carving Tutorial for Beginners",
          author: "Bevelish Creations",
          minutes: 25,
        },
        objectives: [
          "Model a dished tray top with chamfer and fillet transitions",
          "Program 3D Adaptive Clearing with stock to leave and a machining boundary",
          "Program 3D Parallel with rest machining from previous operations",
          "Choose stepover as a percentage of ball nose diameter",
        ],
        steps: [
          "Follow the video to model the dish and set up CAM. Save as 'M5-01 Dish'. Scale the diameter down to fit your machine if needed.",
          "3D Adaptive: tool T1, Machining Boundary = Selection (the dish rim), Stock to Leave 0.5 mm, Max Roughing Stepdown 4 mm, Optimal Load 2 mm.",
          "3D Parallel: tool T3 (1/8 in ball) or T5 (1/4 in ball), boundary = same rim, Rest Machining on, Source = From Previous Operations, Adjustment = As Computed. Stepover 8% of the ball diameter. Pass direction 45 degrees to the grain.",
          "Simulate with Stock. Compare surface finish at 8% and at 15% stepover using Compare in the simulation dialog. Note the time difference.",
          "Add a 2D Contour with tabs to cut the tray free. Post three files, one per tool.",
          "Cut it. After the finishing pass, note where cusps remain; that tells you whether stepover or the bit radius was the limit.",
        ],
        shopNotes: [
          "Roughing leaves stairs. That is expected. Finishing removes them. Do not chase a smooth finish with the roughing tool.",
          "Tapered ball nose bits are stiffer than straight ones at small tip diameters. For detail under 3 mm, a 1/16 in tapered ball is the standard choice.",
          "Re-zero Z after every tool change with a touch plate; a 0.2 mm error is visible on a finished surface.",
        ],
        quiz: [
          {
            question: "In 3D Parallel with Rest Machining set to From Previous Operations, what happens?",
            options: [
              "The toolpath ignores the roughing pass",
              "The finishing pass only cuts where material remains after roughing",
              "The toolpath only cuts flat areas",
              "The stepover is computed automatically",
            ],
            answer: 1,
            explanation:
              "Rest machining uses the stock state left by earlier operations, so the finishing tool does not waste time cutting air.",
          },
        ],
        resources: [
          {
            label: "Tinkster: written companion to the video with exact settings",
            url: "https://tinkster.dev/project/fusion-360-cam-tutorial-for-3d-carving-beginners",
          },
        ],
      },
      {
        slug: "form-modeling",
        title: "Organic shapes with Form (T-splines)",
        kind: "video",
        summary:
          "Sculpt a shallow leaf relief with the Form environment, then convert it to a solid you can carve.",
        minutes: 60,
        video: {
          youtubeId: "NqjbJZ2ekRU",
          title: "Fusion T-splines are easy! (Day 27)",
          author: "Product Design Online",
          minutes: 11,
        },
        alsoWatch: [
          {
            youtubeId: "4a9YCrnypNA",
            title: "Modeling with T-Splines in Fusion 360 (deeper dive)",
            author: "Product Design Online",
            minutes: 20,
          },
        ],
        objectives: [
          "Enter Create Form and edit faces, edges, and vertices with Edit Form",
          "Use symmetry and Insert Edge to control detail",
          "Finish Form and confirm the result is a solid, not a surface",
          "Combine the relief with a flat plaque for machining",
        ],
        steps: [
          "New design 'M5-02 Leaf Relief'. Model a 200 x 120 x 18 mm plaque first.",
          "Create Form > Plane, 120 x 60 mm, 8 x 4 faces, on the top of the plaque. Turn on Mirror Symmetry along the long axis.",
          "Edit Form: pull the center edge loop up 6 mm, pull the tip vertices to a point, and drop the outer edge loop to touch the plaque top. Insert Edge along the midrib and pull it down 1 mm to make a vein.",
          "Thicken the form 2 mm downward (Modify > Thicken) so it becomes a closed solid, then Finish Form. Confirm the Browser shows a Body, not a Surface.",
          "Combine > Join the leaf into the plaque. Check for gaps with Section Analysis.",
          "Manufacture: 3D Adaptive with T1 (stock to leave 0.5 mm), then 3D Scallop or Parallel with T3 at 8% stepover over a boundary just outside the leaf. Simulate.",
        ],
        shopNotes: [
          "Start T-splines with the fewest faces that describe the shape. Detail comes from Insert Edge later, not from a dense starting grid.",
          "For carving, keep relief height under one third of the bit's flute length so the shank never rubs the walls.",
        ],
        quiz: [
          {
            question: "You Finish Form and the Browser shows a surface body. What went wrong?",
            options: [
              "The form was not fully closed (it has open edges)",
              "You used symmetry",
              "T-splines always produce surfaces",
              "The plaque body was hidden",
            ],
            answer: 0,
            explanation:
              "Only a closed T-spline becomes a solid. Use Thicken or Fill Hole to close it, or use surface tools to stitch it after finishing.",
          },
        ],
      },
      {
        slug: "import-relief-meshes",
        title: "Lab: import STL reliefs and machine them directly",
        kind: "lab",
        summary:
          "Bring a downloaded relief or topographic STL into Fusion, scale it, and machine it as a mesh, no conversion needed.",
        minutes: 60,
        objectives: [
          "Insert a mesh and set its units and orientation",
          "Measure and scale a mesh to your stock",
          "Set up CAM directly on a mesh body",
          "Know when to reduce and convert a mesh, and when not to",
        ],
        steps: [
          "Download a free relief STL (a topographic map of your area or a decorative medallion) from Printables or Thingiverse. Look for under 500k triangles.",
          "New design 'M5-03 Relief'. Insert > Insert Mesh. Set units to match the file (usually mm). Use Inspect > Measure to check its width.",
          "If it needs resizing: Mesh workspace > Modify > Scale. Scale uniformly to fit a 200 x 200 mm blank with 10 mm margins. Then Move it so the lowest point sits at Z = 0 and the flat back is on the XY plane.",
          "Manufacture: new Setup, select the mesh body as the Model, stock as a fixed box the size of your blank, zero top-left-front.",
          "3D Adaptive with T1, stock to leave 0.5 mm. 3D Parallel with T3 at 8% stepover; add a second Parallel at 90 degrees only if the relief has steep walls in both directions.",
          "Simulate. If Fusion is slow, do not convert the mesh; instead reduce triangle count in the Mesh workspace (Reduce) and re-simulate.",
        ],
        shopNotes: [
          "You can machine a mesh body directly in the Manufacture workspace. Converting to a solid is only needed if you want to edit it with solid tools, and prismatic conversion of a high-poly relief can take a very long time.",
          "Exaggerate topographic Z by 1.5-2x for maps; real terrain is too flat to read at desk scale.",
        ],
        deliverable: "A carved relief from a downloaded mesh, roughed and finished, with a posted file per tool.",
        resources: [
          {
            label: "Make or Break Shop: CNC 3D carving with Fusion 360 from an STL",
            url: "https://www.makeorbreakshop.com/project/cnc-3d-carving-with-fusion-360",
          },
        ],
      },
      {
        slug: "finishing-strategies",
        title: "Lab: stepover, cusp height, and finishing strategies",
        kind: "lab",
        summary:
          "Understand the math behind ball nose finishing so you can pick a stepover on purpose, then compare Parallel, Scallop, and Contour on the same part.",
        minutes: 45,
        objectives: [
          "Compute cusp height from ball diameter and stepover",
          "Choose between Parallel, Scallop, Contour, and Morphed Spiral by geometry",
          "Use machining boundaries and contact-only options",
          "Estimate machine time before committing to a finish",
        ],
        steps: [
          "Open the Reference page in this course and use the cusp height calculator: a 1/8 in (3.175 mm) ball at 8% stepover leaves about 0.005 mm cusps; at 20% about 0.03 mm. Write down the stepover you need for a sand-ready finish (under 0.02 mm) with each ball nose you own.",
          "Open your dish from the first lesson. Duplicate the Parallel finish three times and change the strategy: Scallop, 3D Contour, and Morphed Spiral. Use the same tool and stepover.",
          "Simulate each and note the machine time and where the surface shows cusps. Parallel struggles on walls parallel to the pass direction; Contour struggles on shallow floors; Scallop is consistent everywhere.",
          "Add a Steep and Shallow toolpath if your Fusion license includes it, or combine Contour (steep) with Parallel (shallow) using the Slope settings on each.",
          "Pick the combination with the best finish under your time budget and note it in the setup's comments.",
        ],
        shopNotes: [
          "The finish you sand to matters more than the finish off the machine. A 0.02 mm cusp disappears with 150 grit; anything under that is wasted time.",
          "Run the finishing pass at 45 degrees to the grain. Straight along the grain highlights tearout in walnut and cherry.",
        ],
        quiz: [
          {
            question: "Halving the stepover on a ball nose finishing pass roughly does what to cusp height?",
            options: [
              "Halves it",
              "Cuts it to about a quarter",
              "Does not change it",
              "Doubles it",
            ],
            answer: 1,
            explanation:
              "Cusp height scales approximately with the square of the stepover for small stepovers, so halving the stepover reduces cusps to about one quarter, at twice the machine time.",
          },
        ],
      },
    ],
    project: {
      title: "Module project: carved serving tray",
      description:
        "A hardwood tray with a dished interior, a carved relief or monogram on one end, and finger cutouts. Roughed, finished, and cut free in one setup.",
      requirements: [
        "Dish modeled with a swept or lofted profile, relief added with Form or an imported mesh",
        "3D Adaptive roughing with stock to leave, then a finishing strategy you chose from the finishing lab",
        "Cusp height under 0.02 mm on visible surfaces",
        "Contour with tabs as the final operation",
        "Posted files named by tool and operation order",
      ],
    },
  },
  {
    slug: "capstone",
    number: 6,
    title: "Capstone: The Hybrid Keepsake Box",
    tagline: "CNC-cut finger joints, a carved lid, and 3D-printed hinges, all from one parametric model.",
    description:
      "Everything comes together. You will design a box whose walls are cut flat on the CNC with box joints and dogbones, whose lid carries a V-carved or relief design, and whose hinges and feet are printed with the tolerances you measured. Change one parameter and the whole box, its joints, and its hardware update.",
    track: "capstone",
    lessons: [
      {
        slug: "cnc-joinery",
        title: "CNC joinery: box joints and dogbones",
        kind: "video",
        summary:
          "Why a router cannot cut an inside corner, how dogbones and T-bones fix it, and add-ins that generate finger joints and reliefs automatically.",
        minutes: 60,
        video: {
          youtubeId: "FVzPUhCbUPc",
          title: "Box Joint Fusion 360 Add-In",
          author: "Mark Suska",
          minutes: 5,
        },
        alsoWatch: [
          {
            youtubeId: "0Qt5S2ueKRE",
            title: "Box Joint CNC cutting (the add-in's joints on a machine)",
            author: "Mark Suska",
            minutes: 4,
          },
          {
            youtubeId: "veXvbGSDtPk",
            title: "Dogbone Fillet Add-In for Fusion 360 (install on Mac and Windows)",
            author: "What Make Art",
            minutes: 3,
          },
        ],
        objectives: [
          "Explain why inside corners need relief equal to the bit radius",
          "Choose between dogbone, T-bone, and minimal (45 degree) reliefs by visibility",
          "Install and use the Box Joint and Dogbone add-ins",
          "Add joint clearance as a parameter",
        ],
        steps: [
          "Install the Box Joint add-in from the Autodesk App Store and the Dogbone add-in from GitHub (links below). Enable Run on Startup for both.",
          "New design 'M6-01 Joint Test'. Parameters: stock_t (measured), bit_d, joint_clear = 0.1 mm. Model two 100 x 60 mm panels butted at 90 degrees, each stock_t thick.",
          "Run Box Joint on the outside faces. Set finger width around 2 x stock_t and clearance = joint_clear. Inspect the timeline: it is one editable feature.",
          "Run Dogbone on the inside corners of the fingers with tool diameter = bit_d. Try Normal, then Minimal. Look at both from the outside face and decide which you can live with.",
          "Lay both panels flat on a sketch plane (copy bodies and rotate, or use Arrange) so they can be cut from one sheet.",
          "CAM: one setup, 2D Pocket for the finger sockets where needed, 2D Contour with tabs for the outlines. Cut in scrap plywood and test the fit. Adjust joint_clear until they press together by hand.",
        ],
        shopNotes: [
          "Dogbones are ugly on show faces. Use Minimal (45 degree, offset into the corner) reliefs on anything visible, and standard dogbones where a mating part hides them.",
          "A 1/8 in bit halves the visible relief compared to a 1/4 in bit. For small boxes, cut joints with the 1/8 in and everything else with the 1/4 in.",
          "Plywood thickness varies across a sheet by up to 0.3 mm. Measure at the joint locations, not the corner.",
        ],
        quiz: [
          {
            question: "A 1/4 in (6.35 mm) end mill leaves what radius in an inside corner?",
            options: ["0 mm", "1.6 mm", "3.175 mm", "6.35 mm"],
            answer: 2,
            explanation:
              "The bit is round, so the smallest inside radius it can cut equals its own radius: 3.175 mm for a 1/4 in bit.",
          },
        ],
        resources: [
          {
            label: "Box Joint add-in (Autodesk App Store)",
            url: "https://apps.autodesk.com/FUSION/en/Detail/Index?id=3675336968156301217",
          },
          {
            label: "Dogbone add-in (GitHub, DVE2000)",
            url: "https://github.com/DVE2000/Dogbone",
          },
          {
            label: "Mekanika: what dogbones are and how to design them",
            url: "https://www.mekanika.io/en/blog/cnc-milling/what-is-a-dog-bone",
          },
        ],
      },
      {
        slug: "design-the-box",
        title: "Lab: design the box as one parametric assembly",
        kind: "lab",
        summary:
          "Model the box, lid, hinge mortises, and printed hardware in one file with components and joints so the hinge follows the box when it resizes.",
        minutes: 90,
        objectives: [
          "Structure a multi-part design with components and a master parameter set",
          "Generate box joints on four walls and a captured bottom groove",
          "Cut hinge mortises sized from the printed hinge with clearance",
          "Add a lid relief or V-carve design and a printed inlay pocket",
        ],
        steps: [
          "New design 'M6-02 Keepsake Box'. Parameters: box_l = 220, box_w = 140, box_h = 90, stock_t (measured), bit_d, joint_clear, fit_slide, hinge_gap, groove_d = 6 (for a 6 mm bottom panel).",
          "Create components: Front, Back, Left, Right, Bottom, Lid, Hinge (insert your Module 3 hinge with Insert Derive so it stays linked).",
          "Model the four walls as stock_t panels driven by box_l, box_w, box_h. Run Box Joint on all four corners. Add a groove groove_d wide, stock_t/2 deep, 8 mm up from the bottom on the inside of all four walls for the bottom panel.",
          "Model the Bottom to fit the grooves with fit_slide clearance. Model the Lid as a panel box_l + 2 x 10 by box_w + 2 x 10, stock_t thick, with a 5 mm rabbet underneath that registers inside the walls with fit_slide clearance.",
          "Place two Hinge components on the back edge with Joints (Rigid). Use Combine > Cut with the hinge leaves as tools and Keep Tools to create the mortises, then Offset Face the mortise walls by fit_slide.",
          "On the Lid top, add either a 3D leaf relief from Module 5 or a V-carve sketch with a name and date. Add a 60 mm circular pocket 2 mm deep for a printed inlay medallion.",
          "Change box_l to 300. Every wall, joint, groove, mortise, and the lid must follow. Fix anything that does not, then set it back.",
        ],
        shopNotes: [
          "Insert Derive keeps the hinge as a linked reference: improve the hinge later and the box updates. Plain Insert copies it.",
          "Rigid joints, not Move, for placing hardware. Move is a one-time transform; Joints hold their relationship when the box resizes.",
          "Leave the lid 0.5 mm oversize on all edges and flush trim after assembly. CNC-flush lids never quite match after glue-up.",
        ],
        deliverable:
          "A single parametric box file with five wood components, a linked hinge, mortises, a lid design, and an inlay pocket that all update from the master parameters.",
      },
      {
        slug: "cam-the-box",
        title: "Lab: nest, CAM, and cut the wood parts",
        kind: "lab",
        summary:
          "Flatten the box into a sheet layout, program dogbones, pockets, grooves, and tabbed contours, and cut every part from one blank.",
        minutes: 90,
        objectives: [
          "Arrange components flat on a sheet with a documented WCS",
          "Program grooves as 2D Pocket or Slot, joints as Contour with dogbones",
          "Order operations from inside-out and shallow-to-deep",
          "Post one file per tool and label everything",
        ],
        steps: [
          "Create a new design 'M6-03 Box Nest' and Insert Derive the wall, bottom, and lid components from the box file. Use Arrange (Modify menu) or manual Joints to lay every part flat on a sketch of your sheet, 10 mm apart, joint edges facing the same way.",
          "Manufacture: Setup with stock = your measured sheet, zero top-left-front. Machine = the one you built in Module 4.",
          "Operation order: (1) 2D Pocket for the lid inlay pocket and hinge mortises with T2, (2) 2D Pocket or Slot for the bottom grooves with T2, (3) Engrave or 3D finishing on the lid with T4 or T3, (4) 2D Contour through-cuts with T1 and tabs. Dogbone reliefs are already in the geometry, so the contour follows them; verify with the toolpath preview that the tool enters each relief.",
          "For finger sockets narrower than bit_d, switch that contour to T2 and check the joint_clear still applies.",
          "Simulate the full setup, then Compare to check every pocket and groove is within 0.1 mm of the model.",
          "Post one file per tool in operation order: 01-T2-pockets.nc, 02-T2-grooves.nc, 03-T4-lid.nc, 04-T1-contours.nc. Cut. Dry-fit before glue.",
        ],
        shopNotes: [
          "Hold-down: screws in the waste between parts beat tape for a full-sheet nest. Model the screw locations as points in the sketch so you never route into one.",
          "If a joint is tight, do not force it. Increase joint_clear by 0.05 mm and recut one wall; the whole nest updates.",
          "Cut the lid relief before the through-cut so the lid is still part of the sheet while the ball nose works.",
        ],
        deliverable: "All wood parts cut and dry-fitted; joints close by hand pressure.",
      },
      {
        slug: "print-the-hardware",
        title: "Lab: print the hinges, feet, and inlay, then assemble",
        kind: "lab",
        summary:
          "Print the hardware sized by your measured tolerances, fit it to the machined mortises and pockets, and finish the box.",
        minutes: 60,
        objectives: [
          "Export linked hardware components at the right scale",
          "Print in an orientation that puts layer lines in compression",
          "Fit printed parts to machined pockets and adjust one parameter, not the model",
          "Document final parameter values for the next build",
        ],
        steps: [
          "In the box file, export the Hinge (both leaves), four Feet (model a 20 mm dome foot with a 0.4 mm bottom chamfer and a 3.5 mm screw hole), and the Inlay medallion (60 mm minus fit_slide, 2 mm thick, with your logo embossed 0.6 mm).",
          "Print hinges flat as designed in Module 3. Print feet dome-up. Print the inlay face-down on a textured plate so the visible face takes the plate finish.",
          "Test the hinge leaves in the mortises. If tight, do not sand: raise fit_slide by 0.05 mm, re-post 01-T2-pockets.nc, and recut only the lid and back if needed. If loose, lower it.",
          "Glue the walls and bottom, clamp square, and check diagonals. Flush trim the lid to the box. Screw on the hinges with #6 x 1/2 in screws through the printed countersinks.",
          "Press the inlay into its pocket with a dot of CA glue. Attach feet. Finish with oil or wax; printed PLA tolerates oil finishes fine.",
          "Open Change Parameters one last time and add a comment with the date and the final values of joint_clear, fit_slide, and hinge_gap. These are your shop's calibrated numbers for future projects.",
        ],
        shopNotes: [
          "PETG or ASA hinges outlast PLA on anything that lives near a window. Same model; different filament; reprint your fit gauge in the new material first.",
          "Print inlays in a contrasting color and sand the face after installing so the emboss catches light at 320 grit.",
        ],
        deliverable:
          "A finished keepsake box with CNC box joints, a decorated lid, printed hinges and feet, and a documented set of calibrated parameters.",
      },
    ],
    project: {
      title: "Capstone: finished keepsake box",
      description:
        "The final deliverable for the course. Post a photo of the finished box, the parameter table, and the four posted G-code files in your notes.",
      requirements: [
        "Box joints close by hand; reliefs hidden or minimal on show faces",
        "Lid carries a carved or V-carved design and a printed inlay",
        "Printed hinges move freely and are seated in machined mortises",
        "Entire design regenerates when box_l changes by 80 mm",
        "Final parameter values documented with comments in the file",
      ],
    },
  },
];
