// Photo library.
// These are free-to-use Unsplash photos used until KRC's own project photos are ready.
// To use your own photo: put the file in /public/images/... and use its path, e.g. '/images/projects/089-1.jpg'.
// Run `npm run images:download` to save all of these locally into /public/images/stock.

const u = (id, w = 1600) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`

export const IMG = {
  wiresBox: u('1635335874521-7987db781153'),
  panelTest: u('1758101755915-462eddc23f57'),
  wiresColor: u('1601462904263-f2fa0c851cb9'),
  machine: u('1566417110104-cd4f94af0fb3'),
  buildingWires: u('1728808668131-76d40d112271'),
  controlPanel: u('1783419482520-2f8b80a40369'),
  wallSwitch: u('1612257911111-074bd8388f88'),
  electronicsShop: u('1784269273416-bb59288be8d4'),
  breakerBox: u('1544724569-5f546fd6f2b5'),
  clampMeter: u('1553873002-785d775854c9'),
  circuitTester: u('1517420704952-d9f39e95b43e'),
  switchBox: u('1566417110090-6b15a06ec800'),
  breakers: u('1576446470246-499c738d1c8e'),
  electricPost: u('1509390484649-e8f3d1bb0b6d'),
  transformer: u('1509390221805-d1c887a72a00'),
  grayMachine: u('1558054665-fbe00cd7d920'),
  wiresClose: u('1652715564391-38cc4475b7f5'),
  greenMachine: u('1563456019560-2b37aa7ad890'),
  manMachine: u('1660330590022-9f4ff56b63f6'),
  holdingWires: u('1682345262055-8f95f3c513ea'),
  hardhatInstall: u('1621905251189-08b45d6a269e'),
  fixingCable: u('1555963966-b7ae5404b6ed'),
  screwdriverPanel: u('1660330589693-99889d60181e'),
  driller: u('1646640381839-02748ae8ddf0'),
  powerLines: u('1597502310092-31cdaa35b46d'),
  hardhatTool: u('1621905251918-48416bd8575a'),
  bulb: u('1473308822086-710304d7d30c'),
  vintageBulbs: u('1507494924047-60b8ee826ca9'),
  digitalDevice: u('1535612731405-1348d22b842f'),
  metalBar: u('1665242013108-17dfaa492f01'),
}

// People photos (the founder's photo is used for every person until staff photos are ready)
export const PERSON = '/images/jinesh-face.jpg'
export const CEO = '/images/jinesh.jpg'
