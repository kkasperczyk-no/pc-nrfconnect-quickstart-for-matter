/*
 * Copyright (c) 2025 Nordic Semiconductor ASA
 *
 * SPDX-License-Identifier: LicenseRef-Nordic-4-Clause
 */

import Verify from '../../../common/steps/5xFamilyVerify';
import Apps from '../../../common/steps/Apps';
import Develop from '../../../common/steps/develop';
import EcosystemRequirements from '../../../common/steps/EcosystemRequirements';
import EcosystemSetup from '../../../common/steps/EcosystemSetup';
import EnableAdvertising from '../../../common/steps/EnableAdvertising';
import Info from '../../../common/steps/Info';
import Interaction from '../../../common/steps/Interaction';
import Learn from '../../../common/steps/Learn';
import Pairing from '../../../common/steps/Pairing';
import Program from '../../../common/steps/program';
import Rename from '../../../common/steps/Rename';
import SelectEcosystem from '../../../common/steps/SelectEcosystem';
import { Choice } from '../../device/deviceSlice';
import {
    appsCommonConfig,
    commonLearningResources,
    developCommonConfig,
    matterDevResources,
} from '../commonResources';
import { AdvertisingData } from '../pairingConfig';

const infoConfig = {
    title: 'Next-level multiprotocol SoC',
    markdownContent:
        '![nRF54LM20 DK](54LM20DK.png)  \n&nbsp;  \nnRF54LM20 is a SoC (System-on-Chip) in the nRF54L Series. It is an ultra-low power Bluetooth 6.0 SoC with a new best-in-class multiprotocol radio and advanced security features.  \n&nbsp; \n&nbsp; \n&nbsp; ![54L20 DK Technologies](54LSeriesDKTech.png) \n&nbsp;  \nThe nRF54L Series takes the popular nRF52 Series to the next level with excellent processing power and efficiency, expanded memory, and new peripherals, all in a more compact package. \n&nbsp;  \n[Hardware documentation](https://docs.nordicsemi.com/bundle/ug_nrf54lm20_dk/page/UG/nRF54LM20_DK/intro/intro.html)',
};

const programConfig = [
    {
        name: 'Matter Door Lock',
        type: 'jlink',
        description:
            'This door lock sample demonstrates the usage of the Matter application layer to build a door lock device with one basic bolt. You can use this sample as a reference for creating your application. This device works as a Matter accessory device, meaning it can be paired and controlled remotely over a Matter network built on top of a low-power 802.15.4 Thread network.',
        documentation: {
            label: 'Matter Door Lock',
            href: 'https://docs.nordicsemi.com/bundle/ncs-latest/page/nrf/samples/matter/lock/README.html',
        },
        firmware: [
            {
                core: 'Application',
                file: 'nrf54lm20/nrf54lm20dk_lock.hex',
                link: {
                    label: 'Matter Door Lock',
                    href: 'https://docs.nordicsemi.com/bundle/ncs-latest/page/nrf/samples/matter/lock/README.html',
                },
            },
        ],
    },
    {
        name: 'Matter Light Bulb',
        type: 'jlink',
        description:
            'This light bulb sample demonstrates the usage of the Matter application layer to build a white dimmable light bulb device. You can use this sample as a reference for creating your application. This device works as a Matter accessory device, meaning it can be paired and controlled remotely over a Matter network built on top of a low-power 802.15.4 Thread network.',
        documentation: {
            label: 'Matter Light Bulb',
            href: 'https://docs.nordicsemi.com/bundle/ncs-latest/page/nrf/samples/matter/light_bulb/README.html',
        },
        firmware: [
            {
                core: 'Application',
                file: 'nrf54lm20/nrf54lm20dk_light_bulb.hex',
                link: {
                    label: 'Matter Light Bulb',
                    href: 'https://docs.nordicsemi.com/bundle/ncs-latest/page/nrf/samples/matter/light_bulb/README.html',
                },
            },
        ],
    },
    {
        name: 'Matter Temperature Sensor',
        type: 'jlink',
        description:
            'This temperature sensor sample demonstrates the usage of the Matter application layer to build a temperature sensor device. You can use this sample as a reference for creating your application. This device works as a Matter accessory device, meaning it can be paired and controlled remotely over a Matter network built on top of a low-power 802.15.4 Thread network.',
        documentation: {
            label: 'Matter Temperature Sensor',
            href: 'https://docs.nordicsemi.com/bundle/ncs-latest/page/nrf/samples/matter/temperature_sensor/README.html',
        },
        firmware: [
            {
                core: 'Application',
                file: 'nrf54lm20/nrf54lm20dk_temperature_sensor.hex',
                link: {
                    label: 'Matter Temperature Sensor',
                    href: 'https://docs.nordicsemi.com/bundle/ncs-latest/page/nrf/samples/matter/temperature_sensor/README.html',
                },
            },
        ],
    },
] as Choice[];

const verifyConfig = [
    {
        ref: 'Matter Door Lock',
        config: {
            vComIndex: 1,
            regex: /(Using nRF Connect SDK[\s\S]*Init CHIP stack[\s\S]*Device Configuration:[\s\S]*Setup Discriminator \(0xFFFF for UNKNOWN\/ERROR\): 3840 \(0xF00\))/,
        },
    },
    {
        ref: 'Matter Light Bulb',
        config: {
            vComIndex: 1,
            regex: /(Using nRF Connect SDK[\s\S]*Init CHIP stack[\s\S]*Device Configuration:[\s\S]*Setup Discriminator \(0xFFFF for UNKNOWN\/ERROR\): 3840 \(0xF00\))/,
        },
    },
    {
        ref: 'Matter Temperature Sensor',
        config: {
            vComIndex: 1,
            regex: /(Using nRF Connect SDK[\s\S]*Init CHIP stack[\s\S]*Device Configuration:[\s\S]*Setup Discriminator \(0xFFFF for UNKNOWN\/ERROR\): 3840 \(0xF00\))/,
        },
    },
];

const interactConfig = [
    {
        name: 'Matter Door Lock',
        instruction:
            'Follow the instructions below to control the Matter Door Lock state:',
        dkImage: '../resources/devices/images/54LM20DK_controlling.png',
        dkExtraData: 'LED 1',
    },
    {
        name: 'Matter Light Bulb',
        instruction:
            'Follow the instructions below to control the Matter Light Bulb state:',
        dkImage: '../resources/devices/images/54LM20DK_controlling.png',
        dkExtraData: 'LED 1',
    },
    {
        name: 'Matter Temperature Sensor',
        instruction:
            'Follow the instructions below to control the Matter Temperature Sensor state:',
    },
];

const learnConfig = [
    ...commonLearningResources,
    {
        label: 'Developing with nRF54L Series',
        description:
            'Device-specific information about features, DFU solution, and development.',
        link: {
            label: 'Developing with nRF54L Series',
            href: 'https://docs.nordicsemi.com/bundle/ncs-latest/page/nrf/app_dev/device_guides/nrf54l/index.html',
        },
    },
];

const advertisingData = {
    enablePairingImage: '../resources/devices/images/54LM20DK_pairing.png',
    button: 'Button 0',
} as AdvertisingData;

export default {
    device: 'nRF54LM20 DK',
    programConfig,
    interactConfig,
    learnConfig,
    advertisingData,
    flow: [
        Info(infoConfig),
        Rename(),
        Program(programConfig),
        Verify(verifyConfig),
        SelectEcosystem(),
        EcosystemRequirements(),
        EcosystemSetup(),
        EnableAdvertising(advertisingData),
        Pairing(),
        Interaction(interactConfig),
        Learn(learnConfig),
        Develop(developCommonConfig, matterDevResources),
        Apps(appsCommonConfig),
    ],
};
