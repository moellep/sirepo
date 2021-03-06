# -*- coding: utf-8 -*-
u"""Test background processes

:copyright: Copyright (c) 2019 RadiaSoft LLC.  All Rights Reserved.
:license: http://www.apache.org/licenses/LICENSE-2.0.html
"""
from __future__ import absolute_import, division, print_function
from pykern.pkcollections import PKDict
import pytest


def test_elegant(fc):
    _r(
        fc,
        'Compact Storage Ring',
        'twissReport',
    )


def test_synergia(fc):
    _r(
        fc,
        'Simple FODO',
        'bunchReport1',
        shared_model='bunchReport2',
    )


def test_warppba(fc):
    _r(
        fc,
        'Electron Beam',
        'beamPreviewReport',
    )
    _r(
        fc,
        'Laser Pulse',
        'laserPreviewReport',
    )


def test_zgoubi(fc):
    _r(
        fc,
        'Los Alamos Proton Storage Ring',
        'twissReport',
    )
    _r(
        fc,
        'Los Alamos Proton Storage Ring',
        'bunchReport1',
    )
    _r(
        fc,
        'Los Alamos Proton Storage Ring',
        'twissReport2',
    )


def _r(fc, sim_name, analysis_model, shared_model=None):
    from pykern.pkdebug import pkdp, pkdlog
    from sirepo import srunit
    from pykern import pkunit
    import re
    import time

    data = fc.sr_sim_data(sim_name)
    r = fc.sr_run_sim(data, analysis_model)
    if shared_model:
        r = fc.sr_run_sim(data, shared_model, timeout=1, forceRun=False)
        pkunit.pkeq('completed',  r.state)
