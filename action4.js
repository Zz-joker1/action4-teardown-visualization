const partDefinitions = [
  {
    id: "shell",
    name: "机身外壳",
    english: "WEATHER-RESISTANT SHELL",
    description: "紧凑型防护机身，包覆并保护内部组件；圆角轮廓、镜头凸台及正面屏幕按 Action 4 外观特征构建。",
    specs: [["外形尺寸", "70.5 × 44.2 × 32.8 mm"], ["防水深度", "18 m*"], ["表面", "深灰色防护外壳"]],
    source: "产品外形与公开规格参考；三维轮廓为代码建模示意。",
    explode: [-0.76, 0.62, 0.08],
    anchor: [0, 0.96, 0],
  },
  {
    id: "lens",
    name: "镜头模组",
    english: "ULTRA-WIDE LENS",
    description: "超广角镜头组件，负责将外部光线聚焦至影像传感器。前端镜片与镜筒为外观结构示意。",
    specs: [["视角", "155°"], ["光圈", "f/2.8"], ["对焦范围", "0.4 m 至 ∞"]],
    source: "参数为产品规格参考；结构细节为示意。",
    explode: [-1.12, 0.56, 0.48],
    anchor: [-0.7, 0.22, 0.9],
  },
  {
    id: "sensor",
    name: "影像传感器",
    english: "IMAGE SENSOR",
    description: "位于镜头后方的成像核心，将光信号转换为图像数据。传感器尺寸为公开产品规格，芯片外观仅作示意。",
    specs: [["传感器", "1/1.3″ CMOS"], ["最大视频", "4K / 120 fps"], ["色彩模式", "10-bit D-Log M"]],
    source: "公开产品规格参考；传感器封装造型与内部位置为示意。",
    explode: [-0.34, 0.12, 0.88],
    anchor: [-0.5, 0.2, 0.08],
  },
  {
    id: "frontDisplay",
    name: "前置触控屏",
    english: "FRONT TOUCHSCREEN",
    description: "机身正面的彩色触控屏，可用于自拍构图和状态查看。屏幕显示内容由程序绘制。",
    specs: [["屏幕尺寸", "1.4 英寸"], ["用途", "自拍取景 / 状态查看"], ["触控", "支持"]],
    source: "屏幕尺寸及功能为产品规格参考；画面为示意。",
    explode: [0.98, 0.04, 0.68],
    anchor: [0.55, -0.29, 0.73],
  },
  {
    id: "rearDisplay",
    name: "后置触控屏",
    english: "REAR TOUCHSCREEN",
    description: "机身背部主触控屏，用于取景、回放与菜单操作。转动模型可从背面查看。",
    specs: [["屏幕尺寸", "2.25 英寸"], ["用途", "取景 / 回放 / 设置"], ["触控", "支持"]],
    source: "屏幕尺寸及功能为产品规格参考；背面造型为示意。",
    explode: [0.58, -0.68, -0.76],
    anchor: [0.06, 0.05, -0.74],
  },
  {
    id: "mainboard",
    name: "主控电路板",
    english: "MAIN CONTROL BOARD",
    description: "用于处理影像数据并协调相机功能的电路组件。板卡上的芯片布局、走线和接口为教学示意。",
    specs: [["功能", "影像处理与系统控制"], ["位置", "机身内部"], ["布局", "结构示意"]],
    source: "非官方拆机图；电路板造型和元件布局均为示意。",
    explode: [0.15, 0.57, 0.24],
    anchor: [0.08, 0.24, 0.04],
  },
  {
    id: "battery",
    name: "电池模组",
    english: "BATTERY MODULE",
    description: "可拆卸锂离子电池组件，为相机供电。电池容量为产品公开规格，电池包比例与内部构造为示意。",
    specs: [["容量", "1,770 mAh"], ["类型", "锂离子电池"], ["结构", "可拆卸模组"]],
    source: "容量为产品规格参考；模组造型并非官方电池剖面图。",
    explode: [0.84, -0.12, -0.2],
    anchor: [0.3, -0.29, 0],
  },
  {
    id: "record",
    name: "录制按键",
    english: "SHUTTER / RECORD",
    description: "机身顶部的录制控制按键。按键位置、尺寸及颜色按 Action 4 的可辨识外观特征示意。",
    specs: [["位置", "机身顶部"], ["功能", "开始 / 停止录制"], ["标识色", "红色"]],
    source: "按键形态为外观参考；可视化模型不模拟真实按键电路。",
    explode: [0.76, 1.04, 0.04],
    anchor: [0.8, 0.98, 0],
  },
  {
    id: "mount",
    name: "快拆底座",
    english: "MAGNETIC QUICK-RELEASE",
    description: "机身底部的快拆接口结构，用于兼容 DJI 磁吸快拆安装方式。内部磁体及卡扣细节为示意。",
    specs: [["位置", "机身底部"], ["接口", "磁吸快拆结构"], ["用途", "快速安装 / 拆卸"]],
    source: "接口用途为产品功能参考；磁体、卡扣及几何结构为示意。",
    explode: [0.1, -0.9, 0.52],
    anchor: [0, -0.98, 0.12],
  },
];

const canvas = document.querySelector("#model-canvas");
const stage = document.querySelector("#stage-wrap");
const loading = document.querySelector("#model-loading");
const errorPanel = document.querySelector("#stage-error");
const partList = document.querySelector("#part-list");
const partLabels = document.querySelector("#part-labels");
const selectedName = document.querySelector("#detail-title");
const selectedEnglish = document.querySelector("#detail-english");
const selectedDescription = document.querySelector("#detail-description");
const selectedData = document.querySelector("#detail-data");
const selectedSource = document.querySelector("#detail-source");
const selectionIndex = document.querySelector("#selection-index");
const stateLabel = document.querySelector("#stage-state");
const explodeButton = document.querySelector("#explode-button");

const formatIndex = (index) => String(index + 1).padStart(2, "0");

partDefinitions.forEach((part, index) => {
  const button = document.createElement("button");
  button.className = "part-row";
  button.type = "button";
  button.dataset.partId = part.id;
  button.setAttribute("aria-current", String(part.id === "lens"));
  button.innerHTML = `
    <span class="part-row-index">${formatIndex(index)}</span>
    <span class="part-row-name">${part.name}<small>${part.english}</small></span>
    <span class="part-row-mark" aria-hidden="true">↗</span>
  `;
  button.addEventListener("click", () => selectPart(part.id, true));
  partList.append(button);

  const label = document.createElement("button");
  label.className = "model-label";
  label.type = "button";
  label.dataset.partId = part.id;
  label.textContent = part.name;
  label.setAttribute("aria-label", `查看${part.name}详情`);
  label.addEventListener("click", () => selectPart(part.id, true));
  partLabels.append(label);
});

function renderPartDetails(partId) {
  const part = partDefinitions.find((item) => item.id === partId);
  if (!part) return;

  const index = partDefinitions.indexOf(part);
  selectedName.textContent = part.name;
  selectedEnglish.textContent = part.english;
  selectedDescription.textContent = part.description;
  selectedSource.textContent = part.source;
  selectionIndex.textContent = `${formatIndex(index)} / ${formatIndex(partDefinitions.length - 1)}`;
  selectedData.replaceChildren(
    ...part.specs.map(([label, value]) => {
      const row = document.createElement("div");
      const term = document.createElement("dt");
      const description = document.createElement("dd");
      term.textContent = label;
      description.textContent = value;
      row.append(term, description);
      return row;
    }),
  );
  document.querySelectorAll(".part-row").forEach((button) => {
    button.setAttribute("aria-current", String(button.dataset.partId === partId));
  });
  document.querySelectorAll(".model-label").forEach((button) => {
    button.classList.toggle("is-selected", button.dataset.partId === partId);
  });
}

let selectPart = (partId) => renderPartDetails(partId);
renderPartDetails("lens");

async function startViewer() {
  try {
    const [THREE, { OrbitControls }] = await Promise.all([
      import("three"),
      import("three/addons/controls/OrbitControls.js"),
    ]);

    const scene = new THREE.Scene();
    scene.background = new THREE.Color("#101616");
    scene.fog = new THREE.Fog("#101616", 11, 24);

    const camera = new THREE.PerspectiveCamera(36, 1, 0.1, 60);
    camera.position.set(3.35, 2.1, 5.35);

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: false });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.12;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.075;
    controls.minDistance = 3.2;
    controls.maxDistance = 10.5;
    controls.target.set(0, 0, 0);
    controls.maxPolarAngle = Math.PI * 0.84;
    controls.update();

    scene.add(new THREE.HemisphereLight("#d8e6e1", "#18201e", 2.2));

    const keyLight = new THREE.DirectionalLight("#f4ede0", 3.2);
    keyLight.position.set(3.6, 6, 5);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.set(1024, 1024);
    keyLight.shadow.camera.left = -4;
    keyLight.shadow.camera.right = 4;
    keyLight.shadow.camera.top = 4;
    keyLight.shadow.camera.bottom = -4;
    scene.add(keyLight);

    const rimLight = new THREE.PointLight("#62d9c7", 18, 12, 2);
    rimLight.position.set(-4, 1.5, -2.5);
    scene.add(rimLight);
    const warmFill = new THREE.PointLight("#e1a961", 7, 10, 2);
    warmFill.position.set(4, -1.5, 3.5);
    scene.add(warmFill);

    const floor = new THREE.Mesh(
      new THREE.PlaneGeometry(200, 200),
      new THREE.MeshStandardMaterial({ color: "#101616", roughness: 0.94, metalness: 0.05 }),
    );
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = -1.18;
    floor.receiveShadow = true;
    scene.add(floor);

    const grid = new THREE.GridHelper(12, 24, "#314744", "#22302e");
    grid.position.y = -1.17;
    grid.material.transparent = true;
    grid.material.opacity = 0.42;
    scene.add(grid);

    const platform = new THREE.Mesh(
      new THREE.CylinderGeometry(1.95, 2.08, 0.055, 96),
      new THREE.MeshStandardMaterial({ color: "#17201e", roughness: 0.72, metalness: 0.36 }),
    );
    platform.position.y = -1.1;
    platform.receiveShadow = true;
    platform.castShadow = true;
    scene.add(platform);

    const rim = new THREE.Mesh(
      new THREE.TorusGeometry(1.94, 0.012, 8, 96),
      new THREE.MeshBasicMaterial({ color: "#4b8a7f" }),
    );
    rim.rotation.x = Math.PI / 2;
    rim.position.y = -1.065;
    scene.add(rim);

    const parts = new Map();
    const pickTargets = [];
    const shared = {
      shell: new THREE.MeshStandardMaterial({ color: "#303735", roughness: 0.78, metalness: 0.22 }),
      shellEdge: new THREE.MeshStandardMaterial({ color: "#48504d", roughness: 0.68, metalness: 0.28 }),
      dark: new THREE.MeshStandardMaterial({ color: "#111716", roughness: 0.38, metalness: 0.48 }),
      glass: new THREE.MeshPhysicalMaterial({
        color: "#224f55",
        roughness: 0.14,
        metalness: 0.32,
        clearcoat: 1,
        clearcoatRoughness: 0.08,
        transmission: 0.06,
      }),
      teal: new THREE.MeshStandardMaterial({ color: "#5b9e8d", roughness: 0.55, metalness: 0.38 }),
      pcb: new THREE.MeshStandardMaterial({ color: "#27453e", roughness: 0.72, metalness: 0.25 }),
      gold: new THREE.MeshStandardMaterial({ color: "#b78a4c", roughness: 0.38, metalness: 0.68 }),
      red: new THREE.MeshStandardMaterial({ color: "#bc5342", roughness: 0.4, metalness: 0.22 }),
      battery: new THREE.MeshStandardMaterial({ color: "#9b9f94", roughness: 0.58, metalness: 0.48 }),
      screen: new THREE.MeshStandardMaterial({ color: "#182b2d", roughness: 0.2, metalness: 0.18, emissive: "#071719", emissiveIntensity: 0.4 }),
    };

    function roundedRect(width, height, radius) {
      const shape = new THREE.Shape();
      const x = -width / 2;
      const y = -height / 2;
      shape.moveTo(x + radius, y);
      shape.lineTo(x + width - radius, y);
      shape.quadraticCurveTo(x + width, y, x + width, y + radius);
      shape.lineTo(x + width, y + height - radius);
      shape.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
      shape.lineTo(x + radius, y + height);
      shape.quadraticCurveTo(x, y + height, x, y + height - radius);
      shape.lineTo(x, y + radius);
      shape.quadraticCurveTo(x, y, x + radius, y);
      return shape;
    }

    function addPart(id, build) {
      const definition = partDefinitions.find((item) => item.id === id);
      const group = new THREE.Group();
      group.name = definition.name;
      group.userData.partId = id;
      scene.add(group);
      const record = {
        definition,
        group,
        origin: group.position.clone(),
        explosion: new THREE.Vector3(...definition.explode),
        anchor: new THREE.Vector3(...definition.anchor),
        materials: [],
      };
      parts.set(id, record);

      const mesh = (geometry, material, position = [0, 0, 0], rotation = [0, 0, 0]) => {
        const instanceMaterial = material.clone();
        const object = new THREE.Mesh(geometry, instanceMaterial);
        object.position.set(...position);
        object.rotation.set(...rotation);
        object.castShadow = true;
        object.receiveShadow = true;
        object.userData.partId = id;
        group.add(object);
        pickTargets.push(object);
        record.materials.push(instanceMaterial);
        return object;
      };

      build({ group, mesh, THREE, shared, roundedRect });
    }

    addPart("shell", ({ group, mesh, THREE, shared, roundedRect }) => {
      const body = new THREE.ExtrudeGeometry(roundedRect(2.42, 1.62, 0.24), {
        depth: 1.14,
        bevelEnabled: true,
        bevelSegments: 3,
        bevelSize: 0.075,
        bevelThickness: 0.055,
        curveSegments: 8,
      });
      body.translate(0, 0, -0.57);
      mesh(body, shared.shell);
      const frontEdge = new THREE.LineSegments(
        new THREE.EdgesGeometry(new THREE.ShapeGeometry(roundedRect(2.22, 1.43, 0.19))),
        new THREE.LineBasicMaterial({ color: "#4b5c54", transparent: true, opacity: 0.8 }),
      );
      frontEdge.position.z = 0.632;
      frontEdge.userData.partId = "shell";
      group.add(frontEdge);
      parts.get("shell").materials.push(frontEdge.material);
      const rearSeam = new THREE.Mesh(
        new THREE.TorusGeometry(0.69, 0.012, 6, 64),
        shared.shellEdge.clone(),
      );
      rearSeam.position.set(-0.02, 0.02, -0.615);
      rearSeam.scale.set(1.32, 0.91, 1);
      rearSeam.userData.partId = "shell";
      rearSeam.castShadow = true;
      rearSeam.receiveShadow = true;
      // The seam follows the rear cover, so keep its material in the selection/highlight set.
      rearSeam.material = rearSeam.material.clone();
      parts.get("shell").materials.push(rearSeam.material);
      parts.get("shell").group.add(rearSeam);
      pickTargets.push(rearSeam);
    });

    addPart("lens", ({ mesh, THREE, shared }) => {
      const axisZ = [Math.PI / 2, 0, 0];
      mesh(new THREE.CylinderGeometry(0.51, 0.53, 0.15, 64), shared.dark, [-0.7, 0.22, 0.68], axisZ);
      mesh(new THREE.CylinderGeometry(0.455, 0.455, 0.095, 64), shared.gold, [-0.7, 0.22, 0.78], axisZ);
      mesh(new THREE.CylinderGeometry(0.406, 0.425, 0.105, 64), shared.dark, [-0.7, 0.22, 0.865], axisZ);
      mesh(new THREE.CylinderGeometry(0.351, 0.351, 0.045, 64), shared.glass, [-0.7, 0.22, 0.94], axisZ);
      mesh(new THREE.CircleGeometry(0.215, 48), new THREE.MeshBasicMaterial({ color: "#21464e" }), [-0.7, 0.22, 0.966]);
      mesh(new THREE.CircleGeometry(0.035, 24), new THREE.MeshBasicMaterial({ color: "#91d1c9" }), [-0.82, 0.36, 0.97]);
    });

    addPart("sensor", ({ mesh, THREE, shared }) => {
      mesh(new THREE.BoxGeometry(0.58, 0.48, 0.12), shared.pcb, [-0.5, 0.2, 0.04]);
      mesh(new THREE.BoxGeometry(0.32, 0.3, 0.08), shared.dark, [-0.5, 0.2, 0.13]);
      mesh(new THREE.BoxGeometry(0.2, 0.18, 0.035), shared.gold, [-0.5, 0.2, 0.19]);
      mesh(new THREE.BoxGeometry(0.12, 0.12, 0.025), shared.dark, [-0.5, 0.2, 0.22]);
      for (let i = 0; i < 4; i += 1) {
        mesh(new THREE.BoxGeometry(0.025, 0.04, 0.016), shared.gold, [-0.64 + i * 0.09, -0.04, 0.1]);
      }
    });

    addPart("frontDisplay", ({ mesh, THREE, shared, roundedRect }) => {
      const bezel = new THREE.ShapeGeometry(roundedRect(0.77, 0.56, 0.075));
      mesh(bezel, shared.dark, [0.55, -0.29, 0.637]);
      const display = new THREE.ShapeGeometry(roundedRect(0.65, 0.44, 0.04));
      mesh(display, shared.screen, [0.55, -0.29, 0.654]);
      mesh(new THREE.BoxGeometry(0.35, 0.018, 0.006), shared.teal, [0.5, -0.3, 0.663]);
      mesh(new THREE.CircleGeometry(0.018, 18), shared.red, [0.76, -0.1, 0.665]);
      mesh(new THREE.BoxGeometry(0.18, 0.012, 0.006), shared.shellEdge, [0.54, -0.43, 0.664]);
    });

    addPart("rearDisplay", ({ mesh, THREE, shared, roundedRect }) => {
      mesh(new THREE.ShapeGeometry(roundedRect(1.72, 1.1, 0.12)), shared.dark, [0.06, 0.05, -0.635], [0, Math.PI, 0]);
      mesh(new THREE.ShapeGeometry(roundedRect(1.59, 0.98, 0.075)), shared.screen, [0.06, 0.05, -0.652], [0, Math.PI, 0]);
      mesh(new THREE.BoxGeometry(0.58, 0.022, 0.006), shared.teal, [0.06, -0.08, -0.66]);
      mesh(new THREE.BoxGeometry(0.8, 0.014, 0.006), shared.shellEdge, [0.06, -0.15, -0.66]);
      mesh(new THREE.BoxGeometry(0.018, 0.35, 0.006), shared.gold, [-0.53, 0.04, -0.66]);
    });

    addPart("mainboard", ({ mesh, THREE, shared }) => {
      mesh(new THREE.BoxGeometry(1.08, 0.72, 0.08), shared.pcb, [0.08, 0.24, 0.04]);
      mesh(new THREE.BoxGeometry(0.32, 0.26, 0.09), shared.dark, [0.04, 0.28, 0.105]);
      mesh(new THREE.BoxGeometry(0.21, 0.17, 0.02), shared.gold, [0.04, 0.28, 0.16]);
      mesh(new THREE.BoxGeometry(0.28, 0.2, 0.055), shared.dark, [0.39, 0.37, 0.1]);
      mesh(new THREE.BoxGeometry(0.18, 0.12, 0.05), shared.shellEdge, [-0.31, 0.08, 0.1]);
      for (let i = 0; i < 4; i += 1) {
        mesh(new THREE.BoxGeometry(0.12, 0.035, 0.02), shared.gold, [-0.28 + i * 0.19, -0.08, 0.1]);
      }
      mesh(new THREE.BoxGeometry(0.04, 0.2, 0.025), shared.teal, [-0.48, 0.28, 0.095]);
    });

    addPart("battery", ({ mesh, THREE, shared, roundedRect }) => {
      const pack = new THREE.ExtrudeGeometry(roundedRect(0.8, 0.9, 0.09), {
        depth: 0.3,
        bevelEnabled: true,
        bevelSegments: 2,
        bevelSize: 0.025,
        bevelThickness: 0.02,
      });
      pack.translate(0, 0, -0.15);
      mesh(pack, shared.battery, [0.3, -0.29, 0]);
      mesh(new THREE.BoxGeometry(0.56, 0.05, 0.014), shared.dark, [0.3, -0.05, 0.165]);
      mesh(new THREE.BoxGeometry(0.22, 0.035, 0.014), shared.gold, [0.3, -0.58, 0.165]);
      mesh(new THREE.BoxGeometry(0.1, 0.12, 0.07), shared.gold, [0.3, 0.2, 0.03]);
    });

    addPart("record", ({ mesh, THREE, shared }) => {
      mesh(new THREE.CylinderGeometry(0.23, 0.25, 0.12, 40), shared.dark, [0.8, 0.85, 0], [0, 0, 0]);
      mesh(new THREE.CylinderGeometry(0.17, 0.17, 0.1, 40), shared.red, [0.8, 0.93, 0]);
      mesh(new THREE.CylinderGeometry(0.09, 0.11, 0.015, 32), shared.shellEdge, [0.8, 0.985, 0]);
    });

    addPart("mount", ({ mesh, THREE, shared }) => {
      mesh(new THREE.BoxGeometry(1.18, 0.14, 0.66), shared.dark, [0, -0.9, 0]);
      mesh(new THREE.BoxGeometry(0.88, 0.1, 0.42), shared.shellEdge, [0, -1.015, 0]);
      mesh(new THREE.BoxGeometry(0.22, 0.13, 0.34), shared.gold, [-0.36, -1.12, 0]);
      mesh(new THREE.BoxGeometry(0.22, 0.13, 0.34), shared.gold, [0.36, -1.12, 0]);
      mesh(new THREE.BoxGeometry(0.34, 0.06, 0.2), shared.teal, [0, -1.1, 0]);
    });

    let activePartId = "lens";
    let explodeTarget = 0;
    let explodeProgress = 0;
    let pointerDown = null;
    let isReady = false;
    const raycaster = new THREE.Raycaster();
    const pointer = new THREE.Vector2();
    const projected = new THREE.Vector3();
    const clock = new THREE.Clock();

    function highlightPart(partId) {
      for (const [id, part] of parts) {
        for (const material of part.materials) {
          if (!material.emissive) continue;
          material.emissive.set(id === partId ? "#315a4e" : "#000000");
          material.emissiveIntensity = id === partId ? 0.42 : 0;
        }
      }
    }

    selectPart = (partId, explode = false) => {
      if (!parts.has(partId)) return;
      activePartId = partId;
      renderPartDetails(partId);
      highlightPart(partId);
      if (explode) {
        explodeTarget = 1;
        explodeButton.setAttribute("aria-pressed", "true");
      }
      if (isReady) {
        const part = parts.get(partId);
        const label = document.querySelector(`.model-label[data-part-id="${partId}"]`);
        if (label && part) label.classList.add("is-selected");
      }
    };

    function updateLabels() {
      if (!isReady) return;
      const rect = canvas.getBoundingClientRect();
      const positions = [];
      for (const label of partLabels.querySelectorAll(".model-label")) {
        const part = parts.get(label.dataset.partId);
        const visible = explodeProgress > 0.33;
        label.hidden = !visible;
        if (!visible || !part) continue;
        part.group.updateMatrixWorld(true);
        projected.copy(part.anchor).applyMatrix4(part.group.matrixWorld).project(camera);
        const x = (projected.x * 0.5 + 0.5) * rect.width;
        const y = (-projected.y * 0.5 + 0.5) * rect.height;
        const onScreen = projected.z < 1 && x > 12 && x < rect.width - 12 && y > 12 && y < rect.height - 12;
        label.hidden = !onScreen;
        if (onScreen) positions.push({ label, x, y });
      }

      positions.sort((left, right) => left.y - right.y);
      if (positions.length > 0) {
        const top = 28;
        const bottom = rect.height - 66;
        const gap = Math.min(32, (bottom - top) / Math.max(positions.length - 1, 1));
        let nextY = top;
        for (const position of positions) {
          position.y = Math.max(position.y, nextY);
          nextY = position.y + gap;
        }
        if (positions.at(-1).y > bottom) {
          positions.at(-1).y = bottom;
          for (let index = positions.length - 2; index >= 0; index -= 1) {
            positions[index].y = Math.min(positions[index].y, positions[index + 1].y - gap);
          }
        }
        for (const { label, x, y } of positions) {
          const labelWidth = label.offsetWidth;
          const left = Math.max(5, Math.min(rect.width - labelWidth - 10, x));
          label.style.left = `${left}px`;
          label.style.top = `${y}px`;
        }
      }
    }

    function updateModel() {
      for (const [id, part] of parts) {
        const spread = id === "shell" ? explodeProgress * 0.8 : explodeProgress;
        part.group.position.copy(part.origin).addScaledVector(part.explosion, spread);
      }
      const shell = parts.get("shell");
      if (shell) {
        const opacity = 1 - explodeProgress * 0.7;
        for (const material of shell.materials) {
          material.transparent = opacity < 0.99;
          material.opacity = opacity;
          material.depthWrite = opacity > 0.54;
        }
      }
      stateLabel.textContent = explodeProgress > 0.52 ? "拆解视图" : "整机视图";
      explodeButton.setAttribute("aria-pressed", String(explodeTarget > 0.5));
      explodeButton.querySelector("span:last-child").textContent = explodeTarget > 0.5 ? "合拢" : "拆解";
    }

    function resize() {
      const bounds = stage.getBoundingClientRect();
      const width = Math.max(1, bounds.width);
      const height = Math.max(1, bounds.height);
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      updateLabels();
    }

    function animate() {
      requestAnimationFrame(animate);
      const delta = Math.min(clock.getDelta(), 0.05);
      const amount = Math.min(1, delta * 5);
      explodeProgress += (explodeTarget - explodeProgress) * amount;
      if (Math.abs(explodeProgress - explodeTarget) < 0.001) explodeProgress = explodeTarget;
      updateModel();
      controls.update();
      renderer.render(scene, camera);
      updateLabels();
    }

    function chooseView(view) {
      const presets = {
        front: [3.35, 2.1, 5.35],
        rear: [-3.1, 1.75, -5.3],
        top: [0.15, 6.6, 0.5],
      };
      const position = presets[view];
      if (!position) return;
      camera.position.set(...position);
      controls.target.set(0, 0, 0);
      controls.update();
      document.querySelectorAll(".view-button").forEach((button) => {
        const current = button.dataset.view === view;
        button.classList.toggle("is-current", current);
        button.setAttribute("aria-pressed", String(current));
      });
      document.querySelector("#view-readout").textContent = `${view.toUpperCase()} / ORBIT`;
    }

    function resetView() {
      explodeTarget = 0;
      chooseView("front");
      selectPart("lens");
      document.querySelector("#view-readout").textContent = "FRONT / 3⁄4";
    }

    canvas.addEventListener("pointerdown", (event) => {
      pointerDown = { x: event.clientX, y: event.clientY };
    });
    canvas.addEventListener("pointerup", (event) => {
      if (!pointerDown) return;
      const distance = Math.hypot(event.clientX - pointerDown.x, event.clientY - pointerDown.y);
      pointerDown = null;
      if (distance > 5) return;
      const bounds = canvas.getBoundingClientRect();
      pointer.x = ((event.clientX - bounds.left) / bounds.width) * 2 - 1;
      pointer.y = -((event.clientY - bounds.top) / bounds.height) * 2 + 1;
      raycaster.setFromCamera(pointer, camera);
      const hit = raycaster.intersectObjects(pickTargets, false).find((intersection) => {
        const material = intersection.object.material;
        return !material.transparent || material.opacity > 0.12;
      });
      if (hit) selectPart(hit.object.userData.partId, true);
    });

    explodeButton.addEventListener("click", () => {
      explodeTarget = explodeTarget > 0.5 ? 0 : 1;
      explodeButton.setAttribute("aria-pressed", String(explodeTarget > 0.5));
    });
    document.querySelector("#reset-button").addEventListener("click", resetView);
    document.querySelectorAll(".view-button").forEach((button) => {
      button.addEventListener("click", () => chooseView(button.dataset.view));
    });
    window.addEventListener("keydown", (event) => {
      const target = event.target;
      const isTextEntry =
        target instanceof HTMLElement &&
        (target.isContentEditable || target.matches("input, textarea, select") || target.closest("[contenteditable='true']"));
      if (event.altKey || event.ctrlKey || event.metaKey || event.repeat || isTextEntry) return;
      if (event.key.toLowerCase() === "e") {
        explodeTarget = explodeTarget > 0.5 ? 0 : 1;
      } else if (event.key.toLowerCase() === "r") {
        resetView();
      }
    });

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(stage);
    resize();
    isReady = true;
    highlightPart(activePartId);
    selectPart(activePartId);
    loading.hidden = true;
    animate();
  } catch (error) {
    console.error("Unable to initialize the Action 4 viewer.", error);
    loading.hidden = true;
    errorPanel.hidden = false;
  }
}

startViewer();
